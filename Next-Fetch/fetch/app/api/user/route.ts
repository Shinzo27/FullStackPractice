import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient()

export function GET() {
    return Response.json({
        email: "pratham@gmail.com",
        name: "pratham"
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