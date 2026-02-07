import express from 'express';

const orderrouter = express.Router();

import {placeorder,placeorderstripe,placeorderrazorpay,allorders,userorders,updatestatus} from '../controllers/ordercontroller.js';
import adminauth from '../middleware/adminauth';

orderrouter.post('/list',adminauth,allorders);

orderrouter.post('/status',adminauth,updatestatus);




export default orderrouter;