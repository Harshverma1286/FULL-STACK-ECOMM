import express from 'express';

const app = express();

import cors from 'cors';

app.use(cors());

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

import userrouter from './routes/userroutes.js';

import productrouter from './routes/productroutes.js';

import cartrouter from './routes/cartroutes.js';
import orderrouter from './routes/orderroutes.js';

app.use('/api/v1/users',userrouter);

app.use('/api/v1/products',productrouter);

app.use('/api/v1/carts',cartrouter);

app.use('/api/v1/orders',orderrouter);


export default app;



