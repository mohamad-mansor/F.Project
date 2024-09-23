import express from "express";
import dotenv from "dotenv";
import createError from "http-errors";  // Si vous utilisez `http-errors`
import {
    mongoConnect,
    mongoDCListener,
    mongoErrorListener,
  } from "./db/connection.db.js";

dotenv.config();

const app = express();

mongoDCListener();
mongoErrorListener();

(async () => {
  try {
    await mongoConnect();
    console.log("Connexion MongoDB réussie");

    // Lancer le serveur uniquement après la connexion MongoDB
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Le serveur est lancé sur le port ${PORT}`);
    });
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB : ", error);
    process.exit(1);  // Quitter l'application si la connexion à MongoDB échoue
  }
})();

// Middleware pour gérer les routes inexistantes
app.all("*", (req, res, next) => {
  next(createError(404, "Cette page est introuvable"));
});

// Middleware pour gérer les erreurs globales
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    code: err.status || 500,
    message: err.message || "Erreur serveur, contactez le support",
  });
});