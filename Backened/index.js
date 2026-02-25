import "dotenv/config";

import app from "./app.js";
import connectdb from "./DB/index.js";
import connectcloudinary from "./DB/cloudinary.js";

await connectdb();
await connectcloudinary();

export default app;