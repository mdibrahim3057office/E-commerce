import express from "express";
import { adminLogin,adminRegister } from "../../controller/admin/authController.js";

const router = express.Router();
router.post("/register", adminRegister);
router.post("/login", adminLogin);

export default router;
