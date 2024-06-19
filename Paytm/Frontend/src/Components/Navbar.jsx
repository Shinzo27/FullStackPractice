import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className=' text-3xl p-5 text-white flex justify-between items-center'>
        <div className='pl-5'>
          Paytm
        </div>
        <div className='flex justify-center items-center gap-7 pr-5'>
          <h1>Hello, User</h1>
          <div><IoPersonCircleOutline /></div>
        </div>
      </div>
  )
}

export default Navbar