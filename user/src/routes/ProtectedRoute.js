// src/routes/ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Wrap around any route that requires authentication
export default function ProtectedRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}
