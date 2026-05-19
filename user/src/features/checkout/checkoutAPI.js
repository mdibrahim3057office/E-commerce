// src/features/checkout/checkoutAPI.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/user/checkout";

export const createOrderAPI = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });
};

export const verifyPaymentAPI = async (data) => {
  const token = localStorage.getItem("token");
  return await axios.post(`${API_URL}/verify`, data, { headers: { Authorization: `Bearer ${token}` } });
};
