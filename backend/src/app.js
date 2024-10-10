import express from 'express';
import 'dotenv/config'
import cors from 'cors'

const app = express();


app.use(express.json())
app.use(cors())

import userRouter from './routes/user.routes.js';
app.use(userRouter)


export {app}