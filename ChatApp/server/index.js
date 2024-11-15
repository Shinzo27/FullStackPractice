import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    }
})

const CHAT_BOT = 'ChatBot';
let chatRoom = ''
let allUsers = []
let chatRoomUsers = []

io.on('connection', (socket) => {
    console.log(`a user connected on ${socket.id}`);

    socket.on('joinRoom', (data)=>{
        const { room, username } = data;
        socket.join(room);

        let createdTime = new Date().toISOString();
        socket.to(room).emit('message', {
            message: `${username} joined the room`,
            createdTime,
            username: CHAT_BOT,
        })

        socket.emit('message', {
            message: `Welcome to the room ${room}`,
            room: room,
            createdTime,
            username: username,
        }); 
        chatRoom = room;
        allUsers.push({ id: socket.id, username, room });
        console.log(allUsers.filter((user) => user.room === room));
        chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('chatroom_users', chatRoomUsers);
        socket.emit('chatroom_users', chatRoomUsers);
    })

    socket.on('leaveRoom', (data) => {
        const { room, username } = data;
        socket.leave(room);
        let createdTime = new Date().toISOString();
        console.log(`${username} left room`);
        socket.to(room).emit('message', {
            message: `${username} left the room`,
            createdTime,
            username: CHAT_BOT,
        })
        socket.to(room).emit('message', {
            username: username,
            message: `${username} has left the chat`,
          });
    })
})


server.listen(8000, () => {
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
});