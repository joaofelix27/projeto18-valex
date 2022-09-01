import express from 'express'
import "express-async-errors";
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routers';
import errorHandler from './middlewares/errorMiddleware'

dotenv.config();

const app = express ();

app.use(cors())
app.use(express.json());
app.use(router)
app.use(errorHandler)

const PORT:number = Number(process.env.PORT) || 4000 ;

app.listen (PORT, () => console.log(`Servidor is running on port ${PORT}`));