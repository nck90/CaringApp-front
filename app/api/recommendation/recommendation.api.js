import apiClient from "../axios";

export const getRecommendations = (payload) => {
  return apiClient.post("/recommendations", payload);
};

