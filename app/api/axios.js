import axios from "axios";
import {
  getSignupToken,
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
} from "../utils/tokenHelper";

const api = axios.create({
  baseURL: "http://43.203.41.246:8080/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 토큰 갱신 중인지 추적
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  async (config) => {
    const noAuthNeeded = [
      "/auth/register",
      "/auth/login",
      "/auth/certification-code",
      "/auth/verify-phone",
      "/auth/token/refresh",
      "/auth/oauth2/login",
      "/auth/oauth2/certification-code",
      "/auth/oauth2/register",
      "/auth/oauth2/verify-phone",
      "/auth/institution/certification-code",
      "/auth/institution/login",
      "/auth/institution/register",
      "/auth/institution/verify-phone",
      "/auth/institution/token/refresh",
    ];

    if (noAuthNeeded.some((path) => config.url.includes(path))) {
      return config;
    }

    try {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (e) {
      return config;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 이미 재시도한 요청이 아닌 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 이미 토큰 갱신 중이면 대기
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // 토큰 갱신 요청
        const response = await axios.post(
          `${api.defaults.baseURL}/auth/token/refresh`,
          {
            request_token: refreshToken,
          }
        );

        const { access_token, refresh_token } = response.data.data || response.data;
        
        if (access_token) {
          await saveTokens(access_token, refresh_token || refreshToken);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          
          processQueue(null, access_token);
          isRefreshing = false;
          
          return api(originalRequest);
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // 토큰 갱신 실패 시 로그아웃 처리
        await clearTokens();
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
