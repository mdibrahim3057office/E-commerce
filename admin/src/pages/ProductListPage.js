// src/pages/ProductListPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../features/product/productSlice";
import ProductList from "../components/ProductList";
import AdminNavbar from "../components/AdminNavbar";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id) => dispatch(deleteProduct(id));

  const handleEdit = (product) => {
    // navigate to edit page with product id
    navigate(`/products/edit/${product._id}`);
  };

  return (
    <>
      <AdminNavbar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <div className="product-manager">
          {status === "loading" ? (
            <p>Loading products...</p>
          ) : (
            <ProductList
              products={items}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default ProductListPage;
