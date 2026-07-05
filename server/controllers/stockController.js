import Stock from "../models/Stock.js";

// Get All Stocks
export const getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create Stock
export const createStock = async (req, res) => {
  try {
    const { symbol, companyName, price } = req.body;

    const stockExists = await Stock.findOne({ symbol });

    if (stockExists) {
      return res.status(400).json({
        message: "Stock already exists",
      });
    }

    const stock = await Stock.create({
      symbol,
      companyName,
      price,
    });

    res.status(201).json({
      message: "Stock Added Successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Stock
export const updateStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    stock.symbol = req.body.symbol || stock.symbol;
    stock.companyName = req.body.companyName || stock.companyName;
    stock.price = req.body.price || stock.price;

    await stock.save();

    res.json({
      message: "Stock Updated Successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Stock
export const deleteStock = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    await stock.deleteOne();

    res.json({
      message: "Stock Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};