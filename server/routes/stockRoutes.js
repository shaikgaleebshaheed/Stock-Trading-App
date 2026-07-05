import express from "express";

import {
  getStocks,
  createStock,
  updateStock,
  deleteStock,
} from "../controllers/stockController.js";

import protect from "../middleware/authMiddleware.js";
import admin from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public
router.get("/", getStocks);

// Admin
router.post("/", protect, admin, createStock);

router.put("/:id", protect, admin, updateStock);

router.delete("/:id", protect, admin, deleteStock);

export default router;