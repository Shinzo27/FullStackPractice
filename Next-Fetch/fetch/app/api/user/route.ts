import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export async function GET(req: NextRequest) {
    const user = await client.user.findFirst({})

    return Response.json({
        email: user?.username,
        name: user?.password
    })
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    await client.user.create({
        data: {
            username: body.username,
            password: body.password
        }
    })

    return Response.json({
        message: "User logged in!"
    })
}