import 'dotenv/config';

import app from '../Backened/app.js';
import connectdb from './DB/index.js';
import connectcloudinary from '../Backened/DB/cloudinary.js';

let isConnected = false;

async function initialize() {
  try {
    if (!isConnected) {
      await connectdb();
      await connectcloudinary();
      isConnected = true;
      console.log("MongoDB and Cloudinary connected");
    }
  } catch (error) {
    console.error("Initialization error:", error);
    throw error;
  }
}

// This ensures DB connects before handling requests
export default async function handler(req, res) {
  await initialize();
  return app(req, res);
}