import app from '../Backened/app.js';
import connectdb from './DB/index.js';
import connectcloudinary from '../Backened/DB/cloudinary.js';

let initialized = false;

async function initialize() {
  if (!initialized) {
    await connectdb();
    await connectcloudinary();
    initialized = true;
  }
}

export default async function handler(req, res) {
  await initialize();
  return app(req, res);
}