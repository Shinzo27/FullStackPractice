const express = require('express')
const mongoose = require('mongoose')
const RootRouter = require('./Routes/index')
const cors = require('cors')
const { checkForAuthentication } = require('./Middleware/auth')
const cookieParser = require('cookie-parser')

const app = express()

mongoose.connect("mongodb+srv://20bmiit031:Shinzo27@cluster0.mcnxi5d.mongodb.net/").then(()=>{console.log("Mongodb Connected!");})

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthentication())

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use("/api/v1", RootRouter)


app.listen(3000, ()=>{
    console.log("Server Started!");
})