import express from "express";
import dotenv from "dotenv";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import { mongoConnect, mongoDCListener, mongoErrorListener } from "./db/connection.db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { authenticateToken } from "./middleware/authmiddleware.js"; 

dotenv.config();

const app = express();

// Middleware for handling cookies
app.use(cookieParser());

// Middleware for parsing JSON requests
app.use(express.json());

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Route to get CSRF token
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// MongoDB listeners and connection
mongoDCListener();
mongoErrorListener();
mongoConnect();

// Authentication and post routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", authenticateToken, postRoutes);

// 404 Error handling
app.all("*", (req, res, next) => {
  next(createError(404, "Page not found"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || "Server error, contact support team",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

