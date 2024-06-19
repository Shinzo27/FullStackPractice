import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import Send from './Pages/Send'

function App() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/send' element={<Send/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App