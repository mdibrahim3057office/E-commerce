import express from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "../../controller/user/cartController.js";
import { verifyUser } from "../../middleware/userMiddleware.js";

const router = express.Router();

router.post("/add", verifyUser, addToCart);
router.put("/update", verifyUser, updateCartItem);
router.delete("/remove", verifyUser, removeCartItem);
router.get("/", verifyUser, getCart);

export default router;
