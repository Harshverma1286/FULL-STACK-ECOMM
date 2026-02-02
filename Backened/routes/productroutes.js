import express from 'express';

const productrouter = express.Router();


import { addproduct } from '../controllers/productscontroller.js';

productrouter.post('/addproduct',addproduct);




export default productrouter;