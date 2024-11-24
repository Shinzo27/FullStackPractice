import { Server } from "socket.io"
import redis from "./redisService";

const userMap = new Map<string, string[]>()

class SocketService {
    private _io:Server;

    constructor(){
        console.log("Socket io connected")
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
                const user = socketsInRoom.map((socket)=>({
                    id: socket.id,
                    username: userMap.get(socket.id)
                }))
                callback(JSON.stringify({ user: user }))
            })

            socket.on('addSong', async ({roomId, song})=> {
                const playlistkey = `room:${roomId}:playlist`
                const votekey = `room:${roomId}:votes`
                const songtitle = JSON.parse(song).title

                await redis.rPush(playlistkey, song)

                await redis.zAdd(votekey, { score: 0, value: songtitle }, { NX: true });

                io.to(roomId).emit('addSong', JSON.parse(song))
            })

            socket.on('upvote', async ({roomId, songTitle})=> {
                const votekey = `room:${roomId}:votes`
                const songtitle = songTitle

                await redis.zIncrBy(votekey, 1, songtitle);

                const result = await redis.zRangeWithScores(votekey, 0, -1);

                if (result.length === 0) {
                    // throw new Error('No songs found in the room.');
                    return console.log("No song found!");
                }

                console.log(result); 
                io.to(roomId).emit('upvote', { result })
            })

            socket.on('downvote', async ({roomId, song})=> {
                const votekey = `room:${roomId}:votes`
                const songtitle = JSON.parse(song).title

                await redis.zIncrBy(votekey, -1, songtitle);
            })

        })
    }

    get io(){
        return this._io
    }
}

export default SocketService
