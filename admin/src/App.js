import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import ProductListPage from "./pages/ProductListPage";
import AddProductPage from "./pages/AddProductPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditProductPage from "./pages/EditProductPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<AdminLogin />} />
        {/* Product List (default after login) */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductListPage />
            </ProtectedRoute>
          }
        />
        {/* Add Product */}
        <Route
          path="/products/add"
          element={
            <ProtectedRoute>
              <AddProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <EditProductPage />
            </ProtectedRoute>
          }
        />{" "}

        {/* Redirect all unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
