

// src/api/apiClient.ts
import axios from "axios";
import { API_CONFIG } from "../Api-Config";

// ✅ Axios instance with base URL
export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
