// app/api/common/upload.api.js
import apiClient from "../axios";

// --------------------------------------------------
// 파일 업로드 (multipart/form-data)
// POST /api/v1/files
// --------------------------------------------------
export const uploadFile = (file) => {
  // file = { uri, name, type }
  const formData = new FormData();

  formData.append("file", {
    uri: file.uri,
    name: file.name || "upload.jpg",
    type: file.type || "image/jpeg",
  });

  return apiClient.post("/files", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
