import { Server } from "socket.io";
import { Redis } from 'ioredis'; 

const pub = new Redis({
    host: "redis-10380.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 10380,
    username: "default",
    password: "w8eVmGb9hbkVS51lpQjYjp3FclmlxKXR", 
})

const sub = new Redis({
    host: "redis-10380.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
    port: 10380,
    username: "default",
    password: "w8eVmGb9hbkVS51lpQjYjp3FclmlxKXR",
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