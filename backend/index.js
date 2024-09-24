import express from "express";
import dotenv from "dotenv";
import createError from "http-errors";  
import {
    mongoConnect,
    mongoDCListener,
    mongoErrorListener,
  } from "./db/connection.db.js";
  import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());

mongoDCListener();
mongoErrorListener();

(async () => {
  try {
    await mongoConnect();
    console.log("MongoDB connection established");

    app.use("/api/auth", authRoutes);   
    app.use("/api/posts", postRoutes); 

    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`server on the Port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection error : ", error);
    process.exit(1);  
  }
})();


app.all("*", (req, res, next) => {
  next(createError(404, "Page not found"));
});


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || "Server error, contact support team",
  });
});