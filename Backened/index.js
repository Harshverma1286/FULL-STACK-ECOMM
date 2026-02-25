import 'dotenv/config';

import app from '../Backened/app.js';
import connectdb from './DB/index.js';
import connectcloudinary from '../Backened/DB/cloudinary.js';

// Initialize connections once
connectdb()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

connectcloudinary();

export default app;