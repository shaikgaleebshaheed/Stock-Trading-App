import express from "express";

import {
  buyStock,
  sellStock,
  getPortfolio,
  getTransactions,
  getDashboard,
  getRecentTransactions,
} from "../controllers/tradeController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/buy", protect, buyStock);

router.post("/sell", protect, sellStock);

router.get("/portfolio", protect, getPortfolio);

router.get("/transactions", protect, getTransactions);

router.get("/dashboard", protect, getDashboard);

router.get("/recent", protect, getRecentTransactions);

export default router;