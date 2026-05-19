import express from "express";
import {
  getProducts,
  getProductById,
} from "../../controller/user/productController.js";

const router = express.Router();

// GET all products (with search, filter, pagination)
router.get("/", getProducts);

// GET product by ID
router.get("/:id", getProductById);

export default router;
