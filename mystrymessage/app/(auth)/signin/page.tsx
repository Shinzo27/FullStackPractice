'use client'

import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Component(){
    const { data: session} = useSession()
    if(session){
        return (
            <>
                Signed In as {session.user.username} <br/>
                <button onClick={()=>signOut()}>Sign Out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br/>
            <button className='bg-blue-600 p-4' onClick={()=>signIn()}>
                Sign in
            </button>
        </>
    )
}
