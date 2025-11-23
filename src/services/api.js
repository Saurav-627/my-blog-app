import axios from "axios";
import { MOCK_USER_KEY } from "../hooks/useAuth";

import { loadJSON } from "./json-store";

const api = axios.create({
  'baseURL': import.meta.env.VITE_APP_API_ENDPOINT,
  'headers': {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const user = loadJSON(MOCK_USER_KEY);
    if (user?.access_token) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;