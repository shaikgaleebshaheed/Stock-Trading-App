import Watchlist from "../models/Watchlist.js";

// Add Stock to Watchlist
export const addToWatchlist = async (req, res) => {
  try {
    const { stockId } = req.body;

    const exists = await Watchlist.findOne({
      user: req.user._id,
      stock: stockId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Already in Watchlist",
      });
    }

    await Watchlist.create({
      user: req.user._id,
      stock: stockId,
    });

    res.status(201).json({
      message: "Added to Watchlist",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Watchlist
export const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({
      user: req.user._id,
    }).populate("stock");

    res.json(watchlist);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Watchlist
export const removeWatchlist = async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(req.params.id);

    res.json({
      message: "Removed from Watchlist",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};