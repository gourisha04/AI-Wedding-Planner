import axios from "axios";

const getBaseURL = () => {
  let url = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
  if (url.endsWith("/api")) {
    url += "/";
  } else if (!url.endsWith("/api/")) {
    if (url.endsWith("/")) {
      url += "api/";
    } else {
      url += "/api/";
    }
  }
  return url;
};

const API = axios.create({
  baseURL: getBaseURL(),
});

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createWedding = async (token, data) =>
  (await API.post("weddings", data, authHeader(token))).data;

export const getAllWeddings = async (token) =>
  (await API.get("weddings", authHeader(token))).data;

export const getWeddingById = async (token, id) =>
  (await API.get(`weddings/${id}`, authHeader(token))).data;

export const updateWedding = async (token, id, data) =>
  (await API.put(`weddings/${id}`, data, authHeader(token))).data;

export const deleteWedding = async (token, id) =>
  (await API.delete(`weddings/${id}`, authHeader(token))).data;

export const uploadMedia = async (token, files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("media", file);
  });
  return (await API.post("uploads", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })).data;
};
