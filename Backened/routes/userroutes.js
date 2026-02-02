import express from 'express';

const userrouter = express.Router();

import { loginuser , registeruser , adminlogin } from '../controllers/usercontroller';



userrouter.post('/register',registeruser);

userrouter.post('/login',loginuser);

userrouter.post('/admin',adminlogin);

export default userrouter;