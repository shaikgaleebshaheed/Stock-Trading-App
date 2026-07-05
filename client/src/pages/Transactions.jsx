import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaArrowUp,
  FaArrowDown,
  FaMoneyBillWave,
} from "react-icons/fa";
import API from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/trade/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load transactions");
    }
  };

  const totalInvestment = transactions
    .filter((item) => item.type === "BUY")
    .reduce((sum, item) => sum + item.totalAmount, 0);

  const totalReturns = transactions
    .filter((item) => item.type === "SELL")
    .reduce((sum, item) => sum + item.totalAmount, 0);

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
        📜 Transaction History
      </h1>

      {/* Summary */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
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
          <FaArrowUp size={35} color="#22c55e" />

          <h3>Total Buy</h3>

          <h2 style={{ color: "#22c55e" }}>
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
          <FaArrowDown size={35} color="#ef4444" />

          <h3>Total Sell</h3>

          <h2 style={{ color: "#ef4444" }}>
            ₹{totalReturns.toLocaleString()}
          </h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          <FaMoneyBillWave size={35} color="#10d0a4" />

          <h3>Total Transactions</h3>

          <h2>{transactions.length}</h2>
        </div>
      </div>

      {transactions.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "80px",
          }}
        >
          <h2>No Transactions Found</h2>

          <p
            style={{
              color: "#94a3b8",
            }}
          >
            Start buying and selling stocks.
          </p>
        </div>
      ) : (
        transactions.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#1e293b",
              padding: "28px",
              borderRadius: "18px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(16,208,164,.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div>
              <h2>{item.stock.companyName}</h2>

              <p>Symbol : {item.stock.symbol}</p>

              <p>Quantity : {item.quantity}</p>

              <p>Price : ₹{item.price}</p>

              <h3
                style={{
                  color: "#10d0a4",
                }}
              >
                ₹{item.totalAmount.toLocaleString()}
              </h3>
            </div>

            <div
              style={{
                textAlign: "right",
              }}
            >
              <span
                style={{
                  background:
                    item.type === "BUY"
                      ? "#123524"
                      : "#4b1d1d",
                  color:
                    item.type === "BUY"
                      ? "#22c55e"
                      : "#ef4444",
                  padding: "10px 18px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                }}
              >
                {item.type}
              </span>

              <p
                style={{
                  marginTop: "20px",
                  color: "#94a3b8",
                }}
              >
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Transactions;