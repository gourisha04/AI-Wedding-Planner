import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const createWedding = async (token, data) =>
  (await API.post("/weddings", data, authHeader(token))).data;

export const getAllWeddings = async (token) =>
  (await API.get("/weddings", authHeader(token))).data;

export const getWeddingById = async (token, id) =>
  (await API.get(`/weddings/${id}`, authHeader(token))).data;

export const updateWedding = async (token, id, data) =>
  (await API.put(`/weddings/${id}`, data, authHeader(token))).data;

export const deleteWedding = async (token, id) =>
  (await API.delete(`/weddings/${id}`, authHeader(token))).data;
