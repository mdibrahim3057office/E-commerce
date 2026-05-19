// src/features/cart/cartAPI.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/user/cart";

export const getCartAPI = async () => {
  const token = localStorage.getItem("token");
  return await axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });
};

export const addToCartAPI = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${API_URL}/add`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const updateCartAPI = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.put(`${API_URL}/update`, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const removeCartAPI = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.delete(`${API_URL}/remove`, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
};
