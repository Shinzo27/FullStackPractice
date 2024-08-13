import express from 'express'
import { createClient } from 'redis'

const app = express()
const client = createClient()

app.use(express.json())

app.post('/submit', async(req,res)=>{
    const { problemId, userId, code, language } = req.body
    //push to prisma
    try {
        await client.lPush("submissions", JSON.stringify({problemId, userId, code, language}))
        res.json({
            message: "Submission Done!"
        })
    } catch (error) {
        console.log(error);
    }
})

async function startServer() {
    try {
        await client.connect()
        console.log("Redis connected!");

        app.listen(3000, ()=>console.log("Server Connected"))

    } catch (error) {
        console.error(error);
    }
}

startServer()