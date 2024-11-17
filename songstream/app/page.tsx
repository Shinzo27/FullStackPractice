"use client"
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

export default function Home() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <h1>Signed in as {session.user}</h1>
        <span>{session.accessToken}</span>
      </div>
    )
  }

  return (
    <div>
        <h1>Sign In</h1>
        <button className="btn btn-primary" onClick={() => signIn("spotify")}>Sign in with Spotify</button>
    </div>
  )
}
