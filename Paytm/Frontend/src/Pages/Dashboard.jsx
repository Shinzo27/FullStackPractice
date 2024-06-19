import React from 'react'
import Navbar from '../Components/Navbar'
import Balance from '../Components/Balance'
import Users from '../Components/Users'


const Dashboard = () => {
  return (
    <div className='bg-gray-800 h-screen'>
      <Navbar/>
      <Balance/>
      <Users/>
    </div>
  )
}

export default Dashboard