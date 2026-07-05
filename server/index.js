import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import tradeRoutes from "./routes/tradeRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/trade", tradeRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Stock Trading App");
});

// Server
const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});