import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
export const NEXT_AUTH = {
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
        }),
        Github({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // signIn: ({user})=>{
        //     if(user.email == "randomperson@gmail.com"){
        //         return false
        //     }
        //     return true
        // }
        // jwt: ({token, user}) => {
        //     token.userId = token.sub;
        //     return token
        // },
        session: ({ session, token, user} : any) => {
            if( session && session.user ) {
                session.user.id = token.userId
            }
            return session
        }
    }
}