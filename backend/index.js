import express from "express";
import dotenv from "dotenv";
import {
    mongoConnect,
    mongoDCListener,
    mongoErrorListener,
  } from "./db/connection.db.js";

import { UserRouter } from "./router/UserRouter.js";

const app = express();

app.use("/user", UserRouter);

dotenv.config();

mongoDCListener();
mongoErrorListener();
await mongoConnect();

app.all("*", (req, res, next) => {
    next(createError.NotFound("This Page is not found"));
  });
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      code: err.status,
      answer: err.message || "Servererror Contact Support",
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
  });