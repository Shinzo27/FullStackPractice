import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = nextAuth({
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username"},
                password: { label: "Password", type: "password", placeholder: "Password"}
            },
            async authorize(credentials: any, req) {
                console.log(credentials);

                return {
                    id: "user1",
                    name: "Pratham",
                    email: "pratham@gmail.com"
                }
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
})

export const GET = handler;
export const POST = handler;