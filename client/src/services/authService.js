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

const unwrapResponse = (response) => response.data;

const getErrorPayload = (error) => error?.response?.data ?? null;

export const getAuthErrorMessage = (error) => {
  const payload = getErrorPayload(error);

  if (!payload) {
    return error?.message || "Unable to complete authentication.";
  }

  if (typeof payload === "string") {
    return payload;
  }

  if (payload.message) {
    return payload.message;
  }

  return "Unable to complete authentication.";
};

export const getAuthFieldErrors = (error) => {
  const message = getAuthErrorMessage(error).toLowerCase();
  const fieldErrors = {};

  if (message.includes("email and password are required")) {
    fieldErrors.email = "Email and password are required.";
    fieldErrors.password = "Email and password are required.";
  }

  if (message.includes("invalid email")) {
    fieldErrors.email = "Invalid email.";
  }

  if (message.includes("password must be at least 6")) {
    fieldErrors.password = "Password must be at least 6 characters.";
  }

  return fieldErrors;
};

export const registerUser = async (data) =>
  unwrapResponse(await API.post("auth/register", data));

export const loginUser = async (data) =>
  unwrapResponse(await API.post("auth/login", data));

export const getProfile = async (token) =>
  unwrapResponse(
    await API.get("auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );

export const updateProfile = async (token, data) =>
  unwrapResponse(
    await API.put("auth/profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );