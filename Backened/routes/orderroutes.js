import express from 'express';

const orderrouter = express.Router();

import {placeorder,placeorderstripe,placeorderrazorpay,allorders,userorders,updatestatus,verifystripe, verifyrazorpay} from '../controllers/ordercontroller.js';
import adminauth from '../middleware/adminauth.js';
import authuser from '../middleware/auth.js';

orderrouter.post('/list',adminauth,allorders);

orderrouter.post('/status',adminauth,updatestatus);

orderrouter.post('/place',authuser,placeorder);

orderrouter.post('/stripe',authuser,placeorderstripe);

orderrouter.post('/razorpay',authuser,placeorderrazorpay);

orderrouter.post('/userorders',authuser,userorders);

orderrouter.post('/verifystripe',authuser,verifystripe);

orderrouter.post('/verifyrazorpay',authuser,verifyrazorpay);


export default orderrouter;