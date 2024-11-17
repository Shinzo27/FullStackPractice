import { signIn, signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  const { data: session } = useSession()

  const handleSignIn = () => {
    signIn("spotify", { redirect: false })
    redirect("/playback")
  }

  if (session) {
    return (
      <div>
        <h1>Signed in as {session.user.name}</h1>
        <span>{session.accessToken}</span>
        <button className="btn btn-primary" onClick={()=>signOut()}>Sign out</button>
      </div>
    )
  }

  return (
    <div>
        <h1>Sign In</h1>
        <button className="btn btn-primary" onClick={handleSignIn}>Sign in with Spotify</button>
    </div>
  )
}

export default page