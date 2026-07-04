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

export const createEvent = async (token, data) =>
  (await API.post("events", data, authHeader(token))).data;

export const getAllEvents = async (token) =>
  (await API.get("events", authHeader(token))).data;

export const getEventsByWedding = async (token, weddingId) =>
  (await API.get(`events/wedding/${weddingId}`, authHeader(token))).data;
