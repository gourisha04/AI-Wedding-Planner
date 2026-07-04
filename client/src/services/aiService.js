import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const generateAIPlan = async (token, weddingId) =>
  (await API.post("/ai/generate-plan", { weddingId }, authHeader(token))).data;

export const getVideoPlan = async (token, weddingId) =>
  (await API.get(`/ai/video-plan/${weddingId}`, authHeader(token))).data;

export const getAlbumDesign = async (token, weddingId) =>
  (await API.get(`/ai/album-design/${weddingId}`, authHeader(token))).data;

export const getFullPlan = async (token, weddingId) =>
  (await API.get(`/ai/full-plan/${weddingId}`, authHeader(token))).data;
