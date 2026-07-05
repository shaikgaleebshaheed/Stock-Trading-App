import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

    window.location.reload();
  };

  return (
    <nav
      style={{
        background: "#111827",
        padding: "18px 6%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}

      <h2
        style={{
          color: "#10d0a4",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        📈 StockTrade
      </h2>

      {/* Links */}

      <div
        style={{
          display: "flex",
          gap: "35px",
          alignItems: "center",
        }}
      >
        <Link className="nav-link" to="/">
          Dashboard
        </Link>

        <Link className="nav-link" to="/stocks">
          Stocks
        </Link>

        {user && (
  <>
    <Link className="nav-link" to="/portfolio">
      Portfolio
    </Link>

    <Link className="nav-link" to="/transactions">
      Transactions
    </Link>

    <Link className="nav-link" to="/watchlist">
      Watchlist
    </Link>

    {isAdmin && (
      <Link className="nav-link" to="/admin">
        Admin
      </Link>
    )}
  </>
)}
      </div>

      {/* Right Side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {!user ? (
          <>
            <Link className="nav-link" to="/login">
              Login
            </Link>

            <Link
              to="/register"
              style={{
                background: "#10d0a4",
                padding: "12px 22px",
                borderRadius: "12px",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              👋 {user.name}
            </span>

            <button
              onClick={logout}
              style={{
                background: "#ef4444",
                border: "none",
                color: "white",
                padding: "12px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;