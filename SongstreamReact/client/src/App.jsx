import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import Dashboard from './Dashboard'

const code = new URLSearchParams(window.location.search).get("code")
function App() {
  useEffect(() => {
    console.log(code)
  }, [code])
  return code ? <Dashboard code={code} /> : <Login />
}

export default App
