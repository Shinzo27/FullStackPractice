import React from 'react'
import Navbar from '../Components/Navbar'
import Balance from '../Components/Balance'
import Users from '../Components/Users'
import { useRecoilState, useRecoilValue } from 'recoil'
import { isAuthenticatedSelector, userAtom } from '../State/atoms'
import { Navigate } from 'react-router-dom'


const Dashboard = () => {
  
  const [auth, setAuth] = useRecoilState(userAtom)

  console.log(auth)

  // if(isAuthenticated == false) return <Navigate to='/signin'/>
  // if(auth.isAuthenticated == false) return <Navigate to='/signin'/>
  return (
    <div className='bg-gray-800 h-screen'>
      <Navbar/>
      <Balance/>
      <Users/>
    </div>
  )
}

export default Dashboard