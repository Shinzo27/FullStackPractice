import axios from 'axios'
import React from 'react'

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=26e584bbf23c494494bcaba67a8bc26e&response_type=code&redirect_uri=http://localhost:5173&scope=streaming %20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

const Login = () => {
  const onClickHandler = async(e) => {
    e.preventDefault()
    window.location.href = AUTH_URL
    await axios.get('http://localhost:3001/callback')
      .then(res => {
        const data = res.data
        console.log(data)
      })
  }

  return (
    <div>
        <button className="btn btn-primary" onClick={onClickHandler}>Login
        </button>
    </div>
  )
}

export default Login