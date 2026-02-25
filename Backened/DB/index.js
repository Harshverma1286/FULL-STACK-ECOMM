import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let isConnected = false;

const connectdb = async () => {
  try {
    // prevent multiple connections in serverless
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return;
    }

    const connectioninstance = await mongoose.connect(process.env.MONGODB_URL, {
      dbName: DB_NAME,   // ✅ Correct way
    });

    isConnected = true;

    console.log(
      `MongoDB connected successfully !! HOST: ${connectioninstance.connection.host}`
    );

  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // important for vercel
  }
};

export default connectdb;
