import apiClient from "../axios";

export const startChat = (payload) => {
  return apiClient.post("/chat/start", payload);
};

export const getMessagesAsMember = (chatRoomId, { page = 0, size = 20, sort = ["createdAt,desc"] } = {}) => {
  return apiClient.get(`/chat/rooms/${chatRoomId}/messages/member`, {
    params: {
      page,
      size,
      sort,
    },
  });
};

export const sendMessageAsMember = (chatRoomId, payload) => {
  return apiClient.post(`/chat/rooms/${chatRoomId}/messages/member`, payload);
};

export const getMessagesAsAdmin = (chatRoomId, { page = 0, size = 20, sort = ["createdAt,desc"] } = {}) => {
  return apiClient.get(`/chat/rooms/${chatRoomId}/messages/admin`, {
    params: {
      page,
      size,
      sort,
    },
  });
};

export const sendMessageAsAdmin = (chatRoomId, payload) => {
  return apiClient.post(`/chat/rooms/${chatRoomId}/messages/admin`, payload);
};

export const closeChatAsMember = (chatRoomId) => {
  return apiClient.post(`/chat/rooms/${chatRoomId}/close/member`);
};

export const closeChatAsAdmin = (chatRoomId) => {
  return apiClient.post(`/chat/rooms/${chatRoomId}/close/admin`);
};

export const getMyConsultRequests = ({ status, page = 0, size = 20, sort = ["createdAt,desc"] } = {}) => {
  return apiClient.get("/members/me/consult-requests", {
    params: {
      status,
      page,
      size,
      sort,
    },
  });
};

export const getChatRoomInfoAsMember = (chatRoomId) => {
  return apiClient.get(`/chat/rooms/${chatRoomId}/member`);
};

export const getChatRoomInfoAsAdmin = (chatRoomId) => {
  return apiClient.get(`/chat/rooms/${chatRoomId}/admin`);
};

export const pollMessagesAsMember = (chatRoomId, lastMessageId) => {
  return apiClient.get(`/chat/rooms/${chatRoomId}/messages/poll/member`, {
    params: {
      lastMessageId,
    },
  });
};

export const pollMessagesAsAdmin = (chatRoomId, lastMessageId) => {
  return apiClient.get(`/chat/rooms/${chatRoomId}/messages/poll/admin`, {
    params: {
      lastMessageId,
    },
  });
};

export const deleteMessageAsMember = (chatRoomId, messageId) => {
  return apiClient.delete(`/chat/rooms/${chatRoomId}/messages/${messageId}/member`);
};

export const deleteMessageAsAdmin = (chatRoomId, messageId) => {
  return apiClient.delete(`/chat/rooms/${chatRoomId}/messages/${messageId}/admin`);
};

export const getInstitutionConsultRequests = (institutionId, { status, page = 0, size = 20, sort = ["createdAt,desc"] } = {}) => {
  return apiClient.get(`/chat/institutions/${institutionId}/consult-requests`, {
    params: {
      status,
      page,
      size,
      sort,
    },
  });
};

