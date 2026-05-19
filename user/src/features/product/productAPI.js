// import axiosInstance from "../../utils/axiosInstance";

// // Get all products
// export const fetchProductsAPI = async () => {
//   const res = await axiosInstance.get("/products");
//   return res.data;
// };

// // Get single product by ID
// export const fetchProductByIdAPI = async (id) => {
//   const res = await axiosInstance.get(`/products/${id}`);
//   return res.data;
// };

// src/features/product/productAPI.js

import axiosInstance from "../../utils/axiosInstance";

// Get all products with pagination + search
export const fetchProductsAPI = async ({
  page = 1,
  limit = 8,
  search = "",
}) => {
  const res = await axiosInstance.get(
    `/products?page=${page}&limit=${limit}&search=${search}`,
  );

  return res.data;
};

// Get single product
export const fetchProductByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);

  return res.data;
};
