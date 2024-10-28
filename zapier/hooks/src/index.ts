import express from 'express';

import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

const app = express()

app.use(express.json());

app.post('/hooks/catch/:userId/:zapId', async(req:any, res: any) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    await client.$transaction(async (tx) => {
        const run = await tx.zapRun.create({
            data: {
                zapId,
                metadata: body,
            },
        });

        await tx.zapRunOutbox.create({
            data: {
                zapRunId: run.id,
            },
        });
    })

    return res.json({ success: true })
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})