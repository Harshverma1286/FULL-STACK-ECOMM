import 'dotenv/config';

import app from '../Backened/app.js';
import connectdb from './DB/index.js';
import connectcloudinary from '../Backened/DB/cloudinary.js';

// Connect DB and cloudinary once
let isConnected = false;

async function initialize() {
  if (!isConnected) {
    try {
      await connectdb();
      await connectcloudinary();
      isConnected = true;
      console.log("DB and Cloudinary connected");
    } catch (err) {
      console.log("Initialization error:", err);
      throw err;
    }
  }
}

// This is the key part for Vercel
export default async function handler(req, res) {
  await initialize();
  return app(req, res);
}