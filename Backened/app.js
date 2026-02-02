import express from 'express';

const app = express();

import cors from 'cors';

app.use(cors());

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

import userrouter from './routes/userroutes';

app.use('/api/v1/users',userrouter);


export default app;



