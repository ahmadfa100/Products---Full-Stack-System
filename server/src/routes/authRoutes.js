import express from "express";
import { login, register, getMe } from "../controllers/authController.js";
import authMiddleWare from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", authMiddleWare, getMe);

export default router;