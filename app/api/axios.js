import axios from "axios";
import { getSignupToken } from "../utils/tokenHelper";

const api = axios.create({
  baseURL: "http://43.203.41.246:8080/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const noAuthNeeded = [
      "/auth/register",
      "/auth/login",
      "/auth/certification-code",
      "/auth/verify-phone",
    ];

    if (noAuthNeeded.some((path) => config.url.includes(path))) {
      return config;
    }

    try {
      const token = await getSignupToken();
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

export default api;
