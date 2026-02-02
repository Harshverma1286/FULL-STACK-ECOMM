import express from 'express';

import cors from 'cors';

import app from '../Backened/app.js';

import 'dotenv/config';
import connectdb from './DB/index.js';
import mongoose from 'mongoose';

import connectcloudinary from '../Backened/DB/cloudinary.js';



connectdb().then(
()=>{
    app.on('error',(error)=>{
        console.log("err",error);
        throw error;
    });

    app.listen(process.env.PORT || 3000,function(){
        console.log(`THE APP IS SUCCESSFULLY WORKING ON PORT ${process.env.PORT}`)
    })
}
).catch(
    (err)=>{
        console.log("err",err);
    }
)

connectcloudinary();