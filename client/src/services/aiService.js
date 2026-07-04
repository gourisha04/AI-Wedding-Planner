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

export const generateAIPlan = async (token, weddingId) =>
  (await API.post("ai/generate-plan", { weddingId }, authHeader(token))).data;

export const getVideoPlan = async (token, weddingId) =>
  (await API.get(`ai/video-plan/${weddingId}`, authHeader(token))).data;

export const getAlbumDesign = async (token, weddingId) =>
  (await API.get(`ai/album-design/${weddingId}`, authHeader(token))).data;

export const getFullPlan = async (token, weddingId) =>
  (await API.get(`ai/full-plan/${weddingId}`, authHeader(token))).data;
