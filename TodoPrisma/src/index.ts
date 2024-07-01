import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
import express, {Express, Request, Response} from 'express'
import todoRouter from './Routes/Todos.js'

const app:Express = express()

app.use(express.json())

app.get('/',(req: Request, res: Response)=>{
    res.send("Hello World!")
})

app.use('/todos', todoRouter)

app.listen(8000, ()=>{
    console.log("Server Started at 8000");
})