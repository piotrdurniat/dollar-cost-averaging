import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";

const Api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default Api;
