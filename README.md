# 📈 Stock Trading App

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that allows users to practice stock trading using virtual funds. Users can register, log in securely, browse available stocks, buy and sell stocks, manage their portfolio, and track transaction history.

---

# 🚀 Features

- 👤 User Registration & Login (JWT Authentication)
- 🔒 Secure Password Encryption using bcrypt
- 📊 View Available Stocks
- 💰 Buy Stocks with Virtual Balance
- 💸 Sell Owned Stocks
- 📁 Portfolio Management
- 📜 Transaction History
- ⭐ Watchlist Management
- 📱 Responsive User Interface
- 🔐 Protected Backend APIs
- ⚡ RESTful API Architecture

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- dotenv
- cors

---

# 📂 Project Structure

```
Stock-Trading-App/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── stockController.js
│   │   ├── tradeController.js
│   │   └── watchlistController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Stock.js
│   │   ├── Portfolio.js
│   │   ├── Transaction.js
│   │   └── Watchlist.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── stockRoutes.js
│   │   ├── tradeRoutes.js
│   │   └── watchlistRoutes.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── Phase Wise Templates/
│
├── Project Documentation/
│
├── .gitignore
├── package.json
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/shaikgaleebshaheed/Stock-Trading-App
```

---

## 2. Navigate to Project

```bash
cd Stock-Trading-App
```

---

## 3. Install Frontend Dependencies

```bash
cd client
npm install
```

---

## 4. Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5555

MONGO_URI=Your MongoDB Connection String

JWT_SECRET=YourSecretKey
```

---

# ▶️ Run Backend

```bash
cd server
npm run dev
```

Backend runs on

```
http://localhost:5555
```

---

# ▶️ Run Frontend

```bash
cd client
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Stocks

```
GET /api/stocks

POST /api/stocks/add
```

---

## Trading

```
POST /api/trade/buy

POST /api/trade/sell

GET /api/trade/portfolio

GET /api/trade/transactions
```

---

## Watchlist

```
POST /api/watchlist

GET /api/watchlist

DELETE /api/watchlist/:id
```

---

# 🔐 Authentication

- JWT Token Authentication
- Protected Routes
- Password Hashing using bcrypt

---

# 📸 Screenshots

Add screenshots of:

- Home Page
- Login Page
- Registration Page
- Dashboard
- Portfolio
- Transaction History
- Watchlist

---

# 🎥 Demo Video

Google Drive Demo Link

https://drive.google.com/file/d/1GiAUDZ-M6ysyZ1MvEKfDELPxOVkT48zv/view?usp=sharing

---

# 🌐 GitHub Repository

https://github.com/shaikgaleebshaheed/Stock-Trading-App

---

# 📄 License

This project was developed for educational and internship purposes.

---

# 🙏 Acknowledgements

- SmartBridge Internship
- MongoDB
- React.js
- Express.js
- Node.js
- Bootstrap
- GitHub

---

## ⭐ If you like this project, consider giving it a Star on GitHub!
