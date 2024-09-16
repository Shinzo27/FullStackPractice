import express from "express";
import { requestCountMiddleware } from "./Monitoring/requestCount";
import client from 'prom-client';

const app = express();
app.use(requestCountMiddleware);

app.get("/user", async(req, res) => {
    let user = {
        name: "Pratham",
        age: 22
    };

    res.json({
        user
    });
});

app.post('/user', async(req, res) => {
    res.json({
        user: "Pratham"
    });
});

app.get("/metrics", async(req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});