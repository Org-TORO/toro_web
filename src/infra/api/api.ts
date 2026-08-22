import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export const refreshApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});