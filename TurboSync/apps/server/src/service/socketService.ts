import { Server } from "socket.io"

const userMap = new Map<string, string[]>()

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

            const emitUser = async(roomId: string)=>{
                const socketsInRoom = await io.in(roomId).fetchSockets()
                const user = socketsInRoom.map((socket)=>({
                    id: socket.id,
                    username: userMap.get(socket.id)
                }))
                io.to(roomId).emit('checkRoom', JSON.stringify({ user: user }))
            }

            socket.on('joinRoom', async({roomId, username})=> {
                socket.join(roomId)
                userMap.set(socket.id, username)
                await emitUser(roomId)
            })

            socket.on('leaveRoom', async(roomId)=> {
                console.log("Leave room " + roomId)
                socket.leave(roomId)
                userMap.delete(socket.id)
                await emitUser(roomId)
            })

            socket.on('checkRoom', async (roomId, callback)=> {
                const socketsInRoom = await io.in(roomId).fetchSockets()
                const user = socketsInRoom.map((socket)=>socket.id)
                callback(user)
            })
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService