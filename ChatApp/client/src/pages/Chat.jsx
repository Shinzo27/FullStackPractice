import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Chat = ({ socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState([]);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [chatRoomUsers, setChatRoomUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('message', (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
      setRoom(data.room);
      setUsername(data.username);
    });
    socket.on('chatroom_users', (data) => {
      setChatRoomUsers(data);
    });

    // Remove event listener on component unmount
    return () => socket.off('message');
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
  
  const leaveRoom = () => {
    socket.emit('leaveRoom', { room, username })
    navigate('/');
    socket.on('chatroom_users', (data) => {
      console.log(data);
      setChatRoomUsers(data);
    });
  }

  return (
    <div>
      {messagesRecieved.map((msg, i) => (
        <div key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{msg.username}</span>
            <span>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p>{msg.message}</p>
          <br />
        </div>
      ))}
      <div>
        TOtal Users
      {
        chatRoomUsers.map((user, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{user.username}</span>
            </div>
            <p>{user.message}</p>
            <br />
          </div>
        ))
      }
      </div>
      <button className="btn btn-secondary" onClick={()=>leaveRoom(room, username)}>Leave Room</button>
    </div>
  );
}

export default Chat