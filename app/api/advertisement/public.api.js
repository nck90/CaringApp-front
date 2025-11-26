import apiClient from "../axios";

export const getActiveAdvertisements = () => {
  return apiClient.get("/advertisements/active");
};

export const getActiveAdvertisementsByType = (type) => {
  return apiClient.get(`/advertisements/active/type/${type}`);
};
