import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import createError from "http-errors";
import { mongoConnect, mongoDCListener, mongoErrorListener } from "./db/connection.db.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { authenticateToken } from "./middleware/authmiddleware.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Route to get CSRF token (to be used by the client)
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// MongoDB listeners and connection
mongoDCListener();
mongoErrorListener();

// Connect to MongoDB
mongoConnect();

// Authentication routes
app.use("/api/auth", authRoutes);

// Post routes (protected with JWT and CSRF protection)
app.use("/api/posts", authenticateToken, postRoutes); // Only authenticated users can access posts

// Handle 404 errors
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

// Start the server on the specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});