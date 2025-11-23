import axios from "axios";
import { MOCK_USER_KEY } from "../hooks/useAuth";

const token = MOCK_USER_KEY

const api = axios.create({
  'baseURL': import.meta.env.VITE_APP_API_ENDPOINT,
  'headers': {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const tokens = token;
    if (!tokens?.access_token) {
      return config;
    }
    config.headers.Authorization = `Bearer ${tokens.access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;