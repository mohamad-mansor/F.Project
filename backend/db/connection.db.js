import mongoose from "mongoose";

const mongoOptions = {
  dbName: "ampes",
  useNewUrlParser: true,      // Better compatibility with new versions of MongoDB
  useUnifiedTopology: true,   // Uses the modern MongoDB connection management engine
};

export async function mongoConnect() {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING, {
      dbName: "ampes",
    });
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.log("MongoDB connection error:", error); 
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
    console.warn("Disconnected from MongoDB");
    // If you want to attempt to reconnect automatically:
    setTimeout(() => {
      console.log("Attempting to reconnect to MongoDB...");
      mongoConnect();
    }, 5000);  // Retry after 5 seconds
  });
}
