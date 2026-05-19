import axiosInstance from "../../utils/axiosInstance";

// Fetch all products
export const fetchProductsAPI = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

// Add new product
export const addProductAPI = async (product) => {
  const formData = new FormData();
  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("sku", product.sku);
  formData.append("originalPrice", product.originalPrice);
  formData.append("sellingPrice", product.sellingPrice);
  formData.append("stock", product.stock);

  // ✅ append actual file
  if (product.image && product.image[0]) {
    formData.append("image", product.image[0]);
  }

  const res = await axiosInstance.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Update product
export const updateProductAPI = async (id, product) => {
  const res = await axiosInstance.put(`/products/${id}`, product);
  return res.data;
};

// Delete product
export const deleteProductAPI = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
