import { useEffect, useState } from "react";
import API from "../services/api";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const res = await API.get("/watchlist");
      setWatchlist(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWatchlist = async (stockId) => {
    try {
      await API.delete(`/watchlist/${stockId}`);
      fetchWatchlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        padding: "40px 6%",
        color: "white",
      }}
    >
      <h1 style={{ marginBottom: "35px" }}>
        ⭐ My Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <h2>No Stocks Added</h2>
      ) : (
        watchlist.map((item) => (
          <div
            key={item._id}
            style={{
              background: "#1e293b",
              padding: "25px",
              marginBottom: "20px",
              borderRadius: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2>{item.stock.companyName}</h2>
              <p>{item.stock.symbol}</p>
              <h3 style={{ color: "#10d0a4" }}>
                ₹{item.stock.price}
              </h3>
            </div>

            <button
              onClick={() =>
                removeFromWatchlist(item.stock._id)
              }
              style={{
                background: "#ef4444",
                border: "none",
                color: "white",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Watchlist;