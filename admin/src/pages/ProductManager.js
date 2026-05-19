import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/product/productSlice";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/ProductManager.scss";

const ProductManager = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.product);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = (data) => {
    dispatch(addProduct(data));
  };

  const handleUpdate = (data) => {
    dispatch(updateProduct({ id: editProduct._id, product: data }));
    setEditProduct(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <>
      <AdminNavbar />
      <div className="product-manager">
        <h2>Product Management...</h2>

        <ProductForm
          onSubmit={editProduct ? handleUpdate : handleAdd}
          defaultValues={editProduct}
        />

        <h3>Product List</h3>
        {status === "loading" ? (
          <p>Loading products...</p>
        ) : (
          <ProductList
            products={items}
            onEdit={setEditProduct}
            onDelete={handleDelete}
          />
        )}
      </div>
    </>
  );
};

export default ProductManager;
