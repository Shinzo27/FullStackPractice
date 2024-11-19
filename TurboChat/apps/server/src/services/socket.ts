import { Server } from "socket.io";
import { Redis } from 'ioredis'; 

const pub = new Redis({
    host: "",
    port: 0,
    username: "default",
    password: "", 
})

const sub = new Redis({
    host: "",
    port: 0,
    username: "default",
    password: "",
})

class SocketService {
    private _io:Server;

    constructor() {
        console.log("Init socket server"); 
        this._io = new Server({
            cors: {
                origin: "*",
                allowedHeaders: ["*"],
            }
        });
        sub.subscribe('message')
    }

    public initListener(){
        const io = this.io;
        io.on('connect', (socket)=>{
            console.log("New Socket Connected!");

            socket.on('event:message', async({ message}: { message: String}) => {
                console.log("New message Rcvd : " + message)
                await pub.publish('message', JSON.stringify({ message }))
            })
        })
        sub.on('message', async (channel, message) => {
            if(channel !== 'message') return;
            console.log("Message Received : " + message)
            io.emit('event:message', message)
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService