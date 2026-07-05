import { useEffect, useState } from "react";
import API from "../services/api";

const inputStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "16px",
  background: "#334155",
  color: "white",
};

const buttonStyle = {
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "10px",
  padding: "14px 20px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
  fontSize: "18px",
};

const tdStyle = {
  padding: "15px",
  color: "#e2e8f0",
};


function Admin() {
  const [stocks, setStocks] = useState([]);

  const [companyName, setCompanyName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [price, setPrice] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const res = await API.get("/stocks");
      setStocks(res.data);
    } catch (error) {
      alert("Failed to load stocks");
    }
  };

  const clearForm = () => {
    setCompanyName("");
    setSymbol("");
    setPrice("");
    setEditingId(null);
  };

  const addStock = async (e) => {
    e.preventDefault();

    try {
      await API.post("/stocks", {
        companyName,
        symbol,
        price,
      });

      alert("Stock Added Successfully");

      clearForm();
      fetchStocks();

    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  const editStock = (stock) => {
    setEditingId(stock._id);
    setCompanyName(stock.companyName);
    setSymbol(stock.symbol);
    setPrice(stock.price);
  };
    const updateStock = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/stocks/${editingId}`, {
        companyName,
        symbol,
        price,
      });

      alert("Stock Updated Successfully");

      clearForm();
      fetchStocks();

    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
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

const averagePrice =
  stocks.length > 0
    ? (
        stocks.reduce(
          (sum, stock) => sum + stock.price,
          0
        ) / stocks.length
      ).toFixed(2)
    : 0;

  const deleteStock = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this stock?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/stocks/${id}`);

      alert("Stock Deleted Successfully");

      fetchStocks();

    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
          color: "#10b981",
        }}
      >
        🛠 Admin Stock Management
      </h1>

              <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "220px",
          }}
        >
          <h3>Total Stocks</h3>
          <h1>{stocks.length}</h1>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "220px",
          }}
        >
          <h3>Average Price</h3>
          <h1>₹{averagePrice}</h1>
        </div>
      </div>

            <input
        type="text"
        placeholder="🔍 Search Stocks..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          border: "none",
          marginBottom: "25px",
          fontSize: "16px",
          background: "#334155",
          color: "white",
        }}
      />

      <form
        onSubmit={editingId ? updateStock : addStock}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          gap: "15px",
          marginBottom: "40px",
        }}
      >
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
          required
        />

        <button
          type="submit"
          style={buttonStyle}
        >
          {editingId ? "Update Stock" : "Add Stock"}
        </button>
      </form>
            <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#1e293b",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#10b981",
              color: "white",
            }}
          >
            <th style={thStyle}>Company</th>
            <th style={thStyle}>Symbol</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "25px",
                  color: "#cbd5e1",
                }}
              >
                No Stocks Available
              </td>
            </tr>
          ) : (
            filteredStocks.map((stock) => (
              <tr
                key={stock._id}
                style={{
                  borderBottom: "1px solid #334155",
                }}
              >
                <td style={tdStyle}>
                  {stock.companyName}
                </td>

                <td style={tdStyle}>
                  {stock.symbol}
                </td>

                <td style={tdStyle}>
                  ₹{stock.price}
                </td>

                <td style={tdStyle}>
                  <button
                    onClick={() => editStock(stock)}
                    style={{
                      background: "#3b82f6",
                      color: "white",
                      border: "none",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteStock(stock._id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "10px 18px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Admin;