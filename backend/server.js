import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import adminAuthRoutes from "./routes/admin/authRoutes.js";
import productRoutes from "./routes/admin/productRoutes.js";
import userAuthRoutes from "./routes/user/authRoutes.js";
import cartRoutes from "./routes/user/cartRoutes.js";
import checkoutRoutes from "./routes/user/checkoutRoutes.js";
import userProductRoutes from "./routes/user/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://your-admin.vercel.app",
      "https://your-user.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/products", productRoutes);
app.use("/api/user/auth", userAuthRoutes);
app.use("/api/user/cart", cartRoutes);
app.use("/api/user/checkout", checkoutRoutes);
app.use("/api/user/products", userProductRoutes);
// Database connection
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("Server running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
