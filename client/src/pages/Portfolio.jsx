import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaWallet,
  FaChartPie,
  FaCoins,
} from "react-icons/fa";
import API from "../services/api";

function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await API.get("/trade/portfolio");
      setPortfolio(res.data);
    } catch (error) {
      toast.error("Failed to load portfolio");
    }
  };

  const sellStock = async (stockId) => {
    try {
      const qty = Number(quantity[stockId]);

      if (!qty || qty <= 0) {
        return toast.warning("Enter valid quantity");
      }

      const res = await API.post("/trade/sell", {
        stockId,
        quantity: qty,
      });

      toast.success(res.data.message);

      setQuantity({
        ...quantity,
        [stockId]: "",
      });

      fetchPortfolio();

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Sell Failed"
      );
    }
  };

  const totalInvestment = portfolio.reduce(
    (sum, item) => sum + item.stock.price * item.quantity,
    0
  );

  const totalStocks = portfolio.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px 6%",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "35px",
        }}
      >
        💼 My Portfolio
      </h1>

      {/* Summary Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "25px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <FaWallet
            size={35}
            color="#10d0a4"
          />

          <h3>Total Investment</h3>

          <h2
            style={{
              color: "#10d0a4",
            }}
          >
            ₹{totalInvestment.toLocaleString()}
          </h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <FaCoins
            size={35}
            color="#10d0a4"
          />

          <h3>Total Stocks</h3>

          <h2>{totalStocks}</h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <FaChartPie
            size={35}
            color="#10d0a4"
          />

          <h3>Companies</h3>

          <h2>{portfolio.length}</h2>
        </div>
      </div>

      {portfolio.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          <h2>No Stocks Purchased</h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Buy some stocks to build your portfolio.
          </p>
        </div>
      ) : (
        portfolio.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "20px",
              marginBottom: "25px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(16,208,164,.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
              e.currentTarget.style.boxShadow =
                "none";
            }}
          >
            <div>
              <h2>{item.stock.companyName}</h2>

              <p>Symbol : {item.stock.symbol}</p>

              <p>Price : ₹{item.stock.price}</p>

              <p>Quantity : {item.quantity}</p>

              <h3
                style={{
                  color: "#10d0a4",
                }}
              >
                Total : ₹
                {(
                  item.stock.price *
                  item.quantity
                ).toLocaleString()}
              </h3>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <input
                type="number"
                min="1"
                placeholder="Qty"
                value={
                  quantity[item.stock._id] || ""
                }
                onChange={(e) =>
                  setQuantity({
                    ...quantity,
                    [item.stock._id]:
                      e.target.value,
                  })
                }
                style={{
                  width: "100px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "none",
                  background: "#0f172a",
                  color: "white",
                  fontSize: "18px",
                }}
              />

              <button
                onClick={() =>
                  sellStock(item.stock._id)
                }
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "15px 28px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: ".3s",
                }}
              >
                Sell Stock
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Portfolio;