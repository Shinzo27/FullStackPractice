import { Server } from "socket.io";

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
    }

    public initListener(){
        const io = this.io;
        io.on('connect', (socket)=>{
            console.log("New Socket Connected!");

            socket.on('event:message', async({ message}: { message: String}) => {
                console.log("New message Rcvd : " + message)
            })
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService