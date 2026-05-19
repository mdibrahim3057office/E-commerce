// src/pages/AddProductPage.js
import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/product/productSlice";
import ProductForm from "../components/ProductForm";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = async (data) => {
    // dispatch addProduct and wait for it to finish
    await dispatch(addProduct(data));

    // ✅ redirect to product list page
    navigate("/products");
  };

  return (
    <>
      <AdminNavbar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <div className="product-manager">
          <ProductForm onSubmit={handleAdd} />
        </div>
      </Container>
    </>
  );
};

export default AddProductPage;
