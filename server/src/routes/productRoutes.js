import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware,upload.single("image"), createProduct);
router.put("/:id", authMiddleware,upload.single("image"), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;