import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../../controller/admin/productController.js";
import { verifyAdmin } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", verifyAdmin, upload.single("image"), addProduct);
router.get("/", getProducts);
router.put("/:id", verifyAdmin, upload.single("image"), updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;
