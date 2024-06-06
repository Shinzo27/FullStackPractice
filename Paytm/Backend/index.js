const express = require('express')
const mongoose = require('mongoose')
const RootRouter = require('./Routes/index')
const cors = require('cors')
const { checkAuthentication } = require('./Middleware/auth')
const cookieParser = require('cookie-parser')

const app = express()

mongoose.connect("mongodb+srv://20bmiit031:Shinzo27@cluster0.mcnxi5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{console.log("Mongodb Connected!");})

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(checkAuthentication())

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use("/api/v1", RootRouter)


app.listen(3000, ()=>{
    console.log("Server Started!");
})