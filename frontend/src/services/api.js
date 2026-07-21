import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("fashion-auth-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
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
// Get All Products
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const createOrder = async (payload) => {
  const response = await api.post("/orders", payload);
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const cancelOrder = async (orderId, reason) => {
  const response = await api.put(`/orders/${orderId}/cancel`, { reason }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};