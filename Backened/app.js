import express from 'express';

const app = express();

import cors from 'cors';

app.use(express.json({limit:"16kb"}));

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));


export default app;



