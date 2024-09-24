import express from "express";
import dotenv from "dotenv";
import createError from "http-errors";
import { mongoConnect, mongoDCListener, mongoErrorListener } from "./db/connection.db.js";
import authRoutes from "./router/authRoutes.js"; 
//import postRoutes from "./routes/postRoutes.js"; 

dotenv.config();

const app = express();
app.use(express.json());

mongoDCListener();
mongoErrorListener();

// MongoDB-Verbindung und Serverstart
(async () => {
  try {
    await mongoConnect();
    console.log("Connexion MongoDB réussie");

    // Endpunkte konfigurieren
    app.use("/api/auth", authRoutes);   // Authentifizierungsrouten unter /api/auth
    //app.use("/api/posts", postRoutes);  // Post-Routen

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Le serveur est lancé sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB : ", error);
    process.exit(1);
  }
})();

// Fehlerbehandlung für nicht existierende Routen
app.all("*", (req, res, next) => {
  next(createError(404, "Cette page est introuvable"));
});

// Globale Fehlerbehandlung
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || "Erreur serveur, contactez le support",
  });
});
