import mongoose from "mongoose";

const mongoOptions = {
  dbName: "ampes",
  useNewUrlParser: true,      // Meilleure compatibilité avec les nouvelles versions de MongoDB
  useUnifiedTopology: true,   // Utilise le moteur de gestion des connexions MongoDB moderne
};
export async function mongoConnect() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      dbName: "ampes",
    });
    console.log("Connection zu MongoDB erfolgreich");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export function mongoErrorListener() {
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
}

export function mongoDCListener() {
  mongoose.connection.on("disconnected", () => {
    console.warn("Déconnecté de MongoDB");
    // Si vous voulez essayer de vous reconnecter automatiquement :
    setTimeout(() => {
      console.log("Tentative de reconnexion à MongoDB...");
      mongoConnect();
    }, 5000);  // Réessayer après 5 secondes
  });
}
