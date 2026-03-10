import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Certifique-se que isso está no .env.local
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;