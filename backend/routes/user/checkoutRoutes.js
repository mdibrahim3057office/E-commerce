import express from "express";
import { checkout } from "../../controller/user/checkoutController.js";
import { verifyPayment } from "../../controller/user/paymentController.js";
import { verifyUser } from "../../middleware/userMiddleware.js";

const router = express.Router();

router.post("/", verifyUser, checkout);
router.post("/verify", verifyUser, verifyPayment);

export default router;
