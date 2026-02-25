import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let isConnected = false;

const connectdb = async () => {
  try {
    if (isConnected) {
      return;
    }

    const connectioninstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    isConnected = true;

    console.log(
      `MongoDB connected successfully !! HOST: ${connectioninstance.connection.host}`
    );

  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; 
  }
};

export default connectdb;

