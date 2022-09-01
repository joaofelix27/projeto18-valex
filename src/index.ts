import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express ();

app.use(cors())
app.use(json());

const PORT:number = Number(process.env.PORT) || 4000 ;

app.listen (PORT, () => console.log(`Servidor is running on port ${PORT}`));