import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import authMiddleWare from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleWare, getMe);

export default router;