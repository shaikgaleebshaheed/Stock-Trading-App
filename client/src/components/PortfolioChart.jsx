import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function PortfolioChart({ portfolio }) {
  if (!portfolio || portfolio.length === 0) {
    return (
      <div
        style={{
          background: "#1e293b",
          padding: "30px",
          borderRadius: "20px",
          color: "white",
          marginTop: "40px",
          textAlign: "center",
        }}
      >
        <h2>📊 Portfolio Allocation</h2>

        <p
          style={{
            color: "#94a3b8",
          }}
        >
          Buy some stocks to view your portfolio chart.
        </p>
      </div>
    );
  }

  const data = {
    labels: portfolio.map((item) => item.stock.companyName),

    datasets: [
      {
        data: portfolio.map(
          (item) => item.stock.price * item.quantity
        ),

        backgroundColor: [
          "#10d0a4",
          "#3b82f6",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#14b8a6",
          "#ec4899",
          "#84cc16",
        ],

        borderWidth: 0,
      },
    ],
  };

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "30px",
        borderRadius: "20px",
        marginTop: "40px",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "20px",
        }}
      >
        📊 Portfolio Allocation
      </h2>

      <div
        style={{
          width: "350px",
          margin: "auto",
        }}
      >
        <Pie data={data} />
      </div>
    </div>
  );
}

export default PortfolioChart;