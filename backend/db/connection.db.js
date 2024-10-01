import mongoose from "mongoose";

// Configuration des options de MongoDB
const mongoOptions = {
  dbName: "ampes",
  useNewUrlParser: true,      // Meilleure compatibilité avec les nouvelles versions de MongoDB
  useUnifiedTopology: true,   // Utilise le moteur de gestion moderne des connexions MongoDB
};

// Fonction pour se connecter à MongoDB
export async function mongoConnect() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, mongoOptions);
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);  // Arrête l'application en cas d'échec
  }
}

// Écoute des erreurs de MongoDB
export function mongoErrorListener() {
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB error:", err);
  });
}

// Écoute de la déconnexion et tentative de reconnexion
export function mongoDCListener() {
  mongoose.connection.on("disconnected", () => {
    console.warn("Disconnected from MongoDB");
    // Reconnexion automatique après 5 secondes
    setTimeout(() => {
      console.log("Attempting to reconnect to MongoDB...");
      mongoConnect();
    }, 5000);
  });
}