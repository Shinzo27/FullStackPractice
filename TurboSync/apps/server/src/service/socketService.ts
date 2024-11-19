import { Server } from "socket.io"

class SocketService {
    private _io:Server;

    constructor(){
        console.log("SOcket io connected")
        this._io = new Server({
            cors: {
                origin: "*",
                allowedHeaders: "*"
            }
        })
    }

    public initListener(){
        const io = this.io;
        io.on('connect', (socket)=>{
            console.log("Socket connected")

            socket.on('event:message', (message)=>{
                console.log("Message received " + message)
                io.emit('event:message', JSON.stringify({ message: message }))
            })
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService