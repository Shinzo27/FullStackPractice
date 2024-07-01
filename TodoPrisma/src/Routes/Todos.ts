import { Router, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

router.get('/getTodos', async(req:Request, res:Response)=>{
    const todos = await prisma.todos.findMany({})
    res.status(200).json({
        success: true,
        todos
    })
})

router.post('/addTodo', async(req:Request, res:Response)=>{
    console.log(req.body);
    const { title, description, done, userId } = req.body
    const response = await prisma.todos.create({
        data: {
            title,
            description,
            done,
            userId
        }
    })

    res.status(200).json({
        success: true,
        message: "Todo created!"
    })
})

router.put('/markAsDone/:id', async(req,res)=>{
    const id:number = parseInt(req.params.id)

    const response = await prisma.todos.update({
        where: {
            id: id
        },
        data: {
            done: "True"
        }
    })

    if(response) {
        res.status(200).json({
            success: true,
            message: "Todo Updated!"
        })
    }
})

router.delete('/deleteTodo/:id', async(req,res)=>{
    const id:number = parseInt(req.params.id)

    const response = await prisma.todos.delete({
        where: {
            id
        }
    })

    if(response) {
        res.status(200).json({
            success: true,
            message: "Todo deleted successfully!"
        })
    }
})

export default router