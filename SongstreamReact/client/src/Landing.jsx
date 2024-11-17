import React from 'react'
import Login from './Login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get("code")
const Landing = () => {

  return code ? <Dashboard code={code} /> : <Login />
  
}

export default Landing