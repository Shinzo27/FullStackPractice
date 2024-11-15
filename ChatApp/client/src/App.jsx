import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import io from 'socket.io-client';

const socket = io("http://localhost:8000");
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Routes>
          <Route path='/' element={<Home socket={socket} />} />
          <Route path='/chat' element={<Chat socket={socket} />} />
        </Routes>
    </>
  )
}

export default App
