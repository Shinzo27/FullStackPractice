"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

export const Appbar = () => {
    const session = useSession()
    const router = useRouter()

    return <div>
        <button onClick={()=>{
            signIn();
        }}>Signin</button>

        <button onClick={()=>{
            signOut();
        }}>Logout</button>

        {JSON.stringify({session})}
    </div>
}