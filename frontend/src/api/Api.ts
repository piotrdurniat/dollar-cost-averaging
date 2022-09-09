import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default Api;
