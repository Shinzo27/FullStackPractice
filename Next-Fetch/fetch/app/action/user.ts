"use server"

import client from '@/db/index'

export async function signup(username: string, password: string) {
    const user = await client.user.create({
        data: {
            username,
            password
        }
    })
    return "Signed up!"
}