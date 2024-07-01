import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
import express, {Express, Request, Response} from 'express'

const app:Express = express()

app.get('/',(req: Request, res: Response)=>{
    res.send("Hello World!")
})

app.listen(8000, ()=>{
    console.log("Server Started at 8000");
})