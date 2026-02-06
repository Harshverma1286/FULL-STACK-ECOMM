import express from 'express';

import { addtocart,getusercart,updatecart } from '../controllers/cartcontroller.js';
import authuser from '../middleware/auth.js';

const cartrouter = express.Router();

cartrouter.post('/addtocart',authuser,addtocart);

cartrouter.get('/getusercart',authuser,getusercart);

cartrouter.post('/updatecart',authuser,updatecart);

export default cartrouter;