import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.15:3002/api/v1", // env later
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API ERROR:", err.response?.data || err.message);

    // handle global errors
    if (err.response?.status === 401) {
      // logout logic
    }

    return Promise.reject(err);
  }
);