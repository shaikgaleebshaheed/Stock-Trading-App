import Portfolio from "../models/Portfolio.js";
import Stock from "../models/Stock.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

// BUY STOCK
export const buyStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    const totalCost = stock.price * quantity;

    const user = await User.findById(req.user._id);

    if (user.balance < totalCost) {
      return res.status(400).json({
        message: "Insufficient Balance",
      });
    }

    user.balance -= totalCost;
    await user.save();

    let portfolio = await Portfolio.findOne({
      user: user._id,
      stock: stock._id,
    });

    if (portfolio) {
      portfolio.quantity += quantity;
      await portfolio.save();
    } else {
      portfolio = await Portfolio.create({
        user: user._id,
        stock: stock._id,
        quantity,
      });
    }

    await Transaction.create({
      user: user._id,
      stock: stock._id,
      type: "BUY",
      quantity,
      price: stock.price,
      totalAmount: totalCost,
    });

    res.status(200).json({
      message: "Stock Purchased Successfully",
      balance: user.balance,
      portfolio,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// SELL STOCK
export const sellStock = async (req, res) => {
  try {
    const { stockId, quantity } = req.body;

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    const user = await User.findById(req.user._id);

    const portfolio = await Portfolio.findOne({
      user: user._id,
      stock: stock._id,
    });

    if (!portfolio) {
      return res.status(400).json({
        message: "Stock not owned",
      });
    }

    if (portfolio.quantity < quantity) {
      return res.status(400).json({
        message: "Insufficient Stock Quantity",
      });
    }

    const totalAmount = stock.price * quantity;

    portfolio.quantity -= quantity;

    if (portfolio.quantity === 0) {
      await Portfolio.findByIdAndDelete(portfolio._id);
    } else {
      await portfolio.save();
    }

    user.balance += totalAmount;
    await user.save();

    await Transaction.create({
      user: user._id,
      stock: stock._id,
      type: "SELL",
      quantity,
      price: stock.price,
      totalAmount,
    });

    res.status(200).json({
      message: "Stock Sold Successfully",
      balance: user.balance,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PORTFOLIO
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({
      user: req.user._id,
    }).populate("stock");

    res.status(200).json(portfolio);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TRANSACTIONS
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).populate("stock");

    res.status(200).json(transactions);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET DASHBOARD STATS
export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const portfolio = await Portfolio.find({
      user: req.user._id,
    }).populate("stock");

    let portfolioValue = 0;
    let stocksOwned = 0;

    portfolio.forEach((item) => {
      portfolioValue += item.quantity * item.stock.price;
      stocksOwned += item.quantity;
    });

    res.status(200).json({
      balance: user.balance,
      portfolioValue,
      stocksOwned,
      companiesOwned: portfolio.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET RECENT TRANSACTIONS
export const getRecentTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    })
      .populate("stock")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};