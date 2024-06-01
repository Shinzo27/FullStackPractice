const express = require('express')
const { createTodo, updateTodo, deleteTodo } = require('./types')
const mongoose = require('mongoose');
const { Todo } = require('./db');
const cors = require('cors')

mongoose.connect("mongodb://127.0.0.1:27017/TodoDb").then(()=>console.log("Mongodb Connected"))

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true
    })
);

app.get('/getTodos', async(req,res)=>{
    const todos = await Todo.find({})
    return res.status(200).json({
        todos
    })
})

app.post('/postTodos', async(req,res)=>{
    const createPayload = req.body
    const parsedPayload = createTodo.safeParse(createPayload)
    if(!parsedPayload.success){
        return res.status(411).json({
            msg:"You Sent Wrong Inputs"
        })
    } 
    //put it in mongo
    const create = await Todo.create({
        title: parsedPayload.data.title,
        description: parsedPayload.data.description,
        completed: false
    })
    if(create) return res.status(200).json({
        success: true,
        message: "Todo Added"
    })
})

app.put('/updateTodo/:id', async (req,res)=>{
    const updatePayload = req.params
    const parsedPayload = updateTodo.safeParse(updatePayload)
    if(!parsedPayload.success) {
        return res.status(411).json({
            msg:"Wrong input"
        })
    }
    //update
    const update = await Todo.findOneAndUpdate({_id: req.params.id}, { completed: true})
    if(update) return res.status(200).json({
        success: true,
        message: "Todo Updated"
    })
})

app.delete('/deleteTodo/:id', async (req,res)=>{
    const deletePayload = req.params
    const parsedPayload = deleteTodo.safeParse(deletePayload)
    if(!parsedPayload.success) {
        return res.status(411).json({
            msg: "Wrong Input!"
        })
    }
    //delete
    const todoDelete = await Todo.findOneAndDelete({_id: req.params.id})
    if(todoDelete) return res.status(200).json({
        success: true,
        message: "Todo Deleted"
    })
}) 

app.listen(8000, ()=>console.log("Server Started!"))