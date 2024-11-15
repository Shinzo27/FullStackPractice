import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const [username, setUsername] = useState(""); // Add this
  const [room, setRoom] = useState(""); // Add this

  const navigate = useNavigate();

  const joinRoom = () => {
        if(room !== "" && username !== "") {
            socket.emit('joinRoom', {room, username});
        }   

        navigate('/chat');
  }
  return (
    <div>
      <div>
        <h1>{`<>DevRooms</>`}</h1>
        <input placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        

        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button className="btn btn-secondary" onClick={joinRoom}>Join Room</button>
      </div>
    </div> 
  );
};

export default Home;