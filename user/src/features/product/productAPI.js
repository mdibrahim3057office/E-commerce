import axiosInstance from "../../utils/axiosInstance";

// Get all products
export const fetchProductsAPI = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

// Get single product by ID
export const fetchProductByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};
