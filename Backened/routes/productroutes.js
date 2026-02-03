import express from 'express';

const productrouter = express.Router();


import { addproduct, listproducts, removeproducts, singleproduct } from '../controllers/productscontroller.js';
import upload from '../middleware/multer.js';

productrouter.post('/addproduct',upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addproduct);

productrouter.post('/listproduct',listproducts);

productrouter.delete('/removeproduct',removeproducts);

productrouter.get('/singleproduct',singleproduct);




export default productrouter;