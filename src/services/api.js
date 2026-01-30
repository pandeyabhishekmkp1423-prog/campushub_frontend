import axios from "axios";

/**
 * baseURL MUST be domain only
 * ❌ NO /api here
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // http://localhost:5000
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminRole");
    }
    return Promise.reject(error);
  }
);

export default api;
