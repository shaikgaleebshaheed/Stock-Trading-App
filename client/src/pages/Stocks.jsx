import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaApple,
  FaSearch,
  FaArrowUp,
  FaChartLine,
} from "react-icons/fa";
import { SiTesla } from "react-icons/si";

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    getStocks();
  }, []);

  const getStocks = async () => {
    try {
      const res = await API.get("/stocks");
      setStocks(res.data);
    } catch (error) {
      alert("Failed to fetch stocks");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const buyStock = async (stockId) => {
    try {
      const qty = Number(quantity[stockId] || 1);

      const res = await API.post("/trade/buy", {
        stockId,
        quantity: qty,
      });

      alert(res.data.message);

      setQuantity({
        ...quantity,
        [stockId]: "",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Purchase Failed");
    }
  };

  const addToWatchlist = async (stockId) => {
    try {
      const res = await API.post("/watchlist", {
        stockId,
      });

      alert(res.data.message);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to add to Watchlist"
      );
    }
  };

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.companyName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      stock.symbol
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
                <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        padding: "40px 6%",
        color: "white",
      }}
    >
      {/* Heading */}

      <h1
        style={{
          fontSize: "48px",
          marginBottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        📈 Available Stocks
      </h1>

      {/* Search */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#1e293b",
          padding: "18px 25px",
          borderRadius: "18px",
          marginBottom: "45px",
        }}
      >
        <FaSearch
          size={24}
          color="#10d0a4"
          style={{ marginRight: "15px" }}
        />

        <input
          type="text"
          placeholder="Search stocks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            fontSize: "24px",
          }}
        />
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        filteredStocks.map((stock) => {
          const qty = Number(quantity[stock._id] || 0);
          const investment = qty * stock.price;

          return (
            <div
              key={stock._id}
              style={{
                background: "#1e293b",
                borderRadius: "24px",
                padding: "35px",
                marginBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: ".3s",
              }}
            >
              {/* Left Side */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                }}
              >
                <div>
                  {stock.symbol === "AAPL" ? (
                    <FaApple size={60} color="white" />
                  ) : stock.symbol === "TSLA" ? (
                    <SiTesla size={60} color="#ff4d4d" />
                  ) : (
                    <FaChartLine
                      size={55}
                      color="#10d0a4"
                    />
                  )}
                </div>

                <div>
                  <h2
                    style={{
                      fontSize: "38px",
                      marginBottom: "8px",
                    }}
                  >
                    {stock.companyName}
                  </h2>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "24px",
                    }}
                  >
                    {stock.symbol}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "15px",
                      marginTop: "15px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        color: "#10d0a4",
                        fontWeight: "bold",
                        fontSize: "34px",
                      }}
                    >
                      ₹{stock.price}
                    </span>

                    <span
                      style={{
                        background: "#123524",
                        color: "#22c55e",
                        padding: "6px 14px",
                        borderRadius: "40px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <FaArrowUp />
                      +2.45%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <div>
                  <input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={quantity[stock._id] || ""}
                    onChange={(e) =>
                      setQuantity({
                        ...quantity,
                        [stock._id]: e.target.value,
                      })
                    }
                    style={{
                      width: "120px",
                      padding: "18px",
                      borderRadius: "15px",
                      border: "none",
                      outline: "none",
                      background: "#0f172a",
                      color: "white",
                      fontSize: "20px",
                    }}
                  />

                  <p
                    style={{
                      color: "#cbd5e1",
                      marginTop: "10px",
                    }}
                  >
                    Investment
                  </p>

                  <h3
                    style={{
                      color: "#10d0a4",
                    }}
                  >
                    ₹{investment}
                  </h3>
                                  </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <button
                    onClick={() => buyStock(stock._id)}
                    style={{
                      background: "#10d0a4",
                      color: "white",
                      border: "none",
                      padding: "16px 30px",
                      borderRadius: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    Buy Stock
                  </button>

                  <button
                    onClick={() => addToWatchlist(stock._id)}
                    style={{
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      padding: "16px 30px",
                      borderRadius: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    ⭐ Watchlist
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Stocks;