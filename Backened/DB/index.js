import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const connectdb = async()=>{
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

        console.log(`mongo db connected successfully !! DB:HOST ${connectioninstance.connection.host}`)
    } catch (error) {
        console.log("mongodb connection err:",error)
        process.exit(1);
    }
}

export default connectdb;


