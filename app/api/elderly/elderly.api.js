// app/api/elderly/elderly.api.js
import apiClient from "../axios";

// --------------------------------------------------
// 1. 내 어르신 프로필 목록 조회
//    GET /api/v1/elderly-profiles
// --------------------------------------------------
export const getMyElderlyProfiles = () => {
  return apiClient.get("/elderly-profiles");
};

// --------------------------------------------------
// 2. 내 어르신 프로필 생성
//    POST /api/v1/elderly-profiles
// --------------------------------------------------
export const createElderlyProfile = (payload) => {
  // payload = {
  //   name, gender, birthDate, bloodType, phoneNumber,
  //   activityLevel, cognitiveLevel, longTermCareGrade,
  //   notes, address: { zipCode, city, street }
  // }
  return apiClient.post("/elderly-profiles", payload);
};

// --------------------------------------------------
// 3. 내 어르신 프로필 조회
//    GET /api/v1/elderly-profiles/{profileId}
// --------------------------------------------------
export const getElderlyProfileDetail = (profileId) => {
  return apiClient.get(`/elderly-profiles/${profileId}`);
};

// --------------------------------------------------
// 4. 내 어르신 프로필 수정
//    PUT /api/v1/elderly-profiles/{profileId}
// --------------------------------------------------
export const updateElderlyProfile = (profileId, payload) => {
  return apiClient.put(`/elderly-profiles/${profileId}`, payload);
};

// --------------------------------------------------
// 5. 내 어르신 프로필 삭제 (Soft delete)
//    DELETE /api/v1/elderly-profiles/{profileId}
// --------------------------------------------------
export const deleteElderlyProfile = (profileId) => {
  return apiClient.delete(`/elderly-profiles/${profileId}`);
};
