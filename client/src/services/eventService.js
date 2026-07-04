import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createEvent = async (token, data) =>
  (await API.post("/events", data, authHeader(token))).data;

export const getAllEvents = async (token) =>
  (await API.get("/events", authHeader(token))).data;

export const getEventsByWedding = async (token, weddingId) =>
  (await API.get(`/events/wedding/${weddingId}`, authHeader(token))).data;
