// src/pages/EditProductPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct, fetchProducts } from "../features/product/productSlice";
import ProductForm from "../components/ProductForm";
import AdminNavbar from "../components/AdminNavbar";
import { Container } from "@mui/material";
import { logout } from "../features/auth/authSlice";

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.product);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const found = items.find((p) => p._id === id);
    if (found) setProduct(found);
  }, [items, id]);

  const handleUpdate = async (data) => {
    await dispatch(updateProduct({ id, product: data }));
    navigate("/products"); // back to list
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <AdminNavbar onLogout={handleLogout} />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {status === "loading" ? (
          <p>Loading product...</p>
        ) : product ? (
          <ProductForm onSubmit={handleUpdate} defaultValues={product} />
        ) : (
          <p>Product not found</p>
        )}
      </Container>
    </>
  );
};

export default EditProductPage;
