import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import PortfolioChart from "../components/PortfolioChart";

import {
  FaWallet,
  FaChartLine,
  FaMoneyBillWave,
  FaArrowUp,
} from "react-icons/fa";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [portfolio, setPortfolio] = useState([]);

  const [stats, setStats] = useState({
    balance: 0,
    portfolioValue: 0,
    stocksOwned: 0,
    companiesOwned: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchPortfolio();
    fetchRecentTransactions();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await API.get("/trade/portfolio");
      setPortfolio(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/trade/dashboard");

      setStats(res.data);

      const updatedUser = {
        ...user,
        balance: res.data.balance,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentTransactions = async () => {
    try {
      const res = await API.get("/trade/recent");
      setRecentTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      {/* Hero */}

      <div className="hero">
        <div>
          <h1>
            Welcome {user?.name || "Trader"} 👋
          </h1>

          <p>
            Invest smarter. Grow faster. Track your portfolio with
            StockTrade.
          </p>

          <div className="hero-buttons">
            <Link to="/stocks">
              <button>Buy Stocks</button>
            </Link>

            <Link to="/portfolio">
              <button className="secondary-btn">
                My Portfolio
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}

      <div className="stats-grid">
        <div className="stat-card">
          <FaWallet className="stat-icon" />

          <h3>Available Balance</h3>

          <h2>₹{stats.balance}</h2>
        </div>

        <div className="stat-card">
          <FaChartLine className="stat-icon" />

          <h3>Portfolio Value</h3>

          <h2>₹{stats.portfolioValue}</h2>
        </div>

        <div className="stat-card">
          <FaMoneyBillWave className="stat-icon" />

          <h3>Companies Owned</h3>

          <h2>{stats.companiesOwned}</h2>
        </div>

        <div className="stat-card">
          <FaArrowUp className="stat-icon" />

          <h3>Total Stocks Owned</h3>

          <h2>{stats.stocksOwned}</h2>
        </div>
      </div>

      {/* Portfolio Chart */}

      <PortfolioChart portfolio={portfolio} />

      {/* Market Overview */}

      <div className="market-card">
        <h2>📈 Market Overview</h2>

        <div className="market-row">
          <span>Apple (AAPL)</span>
          <span className="green">+2.45%</span>
        </div>

        <div className="market-row">
          <span>Tesla (TSLA)</span>
          <span className="green">+1.81%</span>
        </div>

        <div className="market-row">
          <span>Microsoft (MSFT)</span>
          <span className="red">-0.52%</span>
        </div>

        <div className="market-row">
          <span>Nvidia (NVDA)</span>
          <span className="green">+3.92%</span>
        </div>
      </div>

      {/* Recent Transactions */}

      <div className="market-card">
        <h2>📜 Recent Transactions</h2>

        {recentTransactions.length === 0 ? (
          <p
            style={{
              color: "#94a3b8",
              marginTop: "20px",
            }}
          >
            No Transactions Yet
          </p>
        ) : (
          recentTransactions.map((item) => (
            <div
              key={item._id}
              className="market-row"
            >
              <div>
                <h3
                  style={{
                    marginBottom: "5px",
                  }}
                >
                  {item.stock.companyName}
                </h3>

                <small
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {new Date(item.createdAt).toLocaleString()}
                </small>
              </div>

              <div
                style={{
                  textAlign: "right",
                }}
              >
                <span
                  style={{
                    color:
                      item.type === "BUY"
                        ? "#22c55e"
                        : "#ef4444",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {item.type}
                </span>

                <p
                  style={{
                    color: "white",
                    marginTop: "5px",
                    fontWeight: "bold",
                  }}
                >
                  ₹{item.totalAmount}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;