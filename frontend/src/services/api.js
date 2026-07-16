import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const registerUser = async (name, identifier, password) => {
  const response = await api.post("/auth/register", {
    name,
    email: identifier,
    password,
  });
  return response.data;
};

export const loginUser = async (identifier, password) => {
  const response = await api.post("/auth/login", {
    email: identifier,
    password,
  });
  return response.data;
};

export const createOrder = async (payload) => {
  const response = await api.post("/orders", payload);
  return response.data;
};