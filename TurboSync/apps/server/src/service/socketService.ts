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
                const votekey = `room:${roomId}:votes`
                const socketsInRoom = await io.in(roomId).fetchSockets()
                const user = socketsInRoom.map((socket)=>({
                    id: socket.id,
                    username: userMap.get(socket.id)
                }))
                const playlist = await redis.zRangeWithScores(votekey, 0, -1, { REV: true });
                callback(JSON.stringify({ user: user, playlist: playlist }))
            })

            socket.on('addSong', async ({roomId, song})=> {
                const votekey = `room:${roomId}:votes`
                const songtitle = JSON.parse(song).title

                await redis.zAdd(votekey, { score: 0, value: songtitle }, { NX: true });

                const songs = await redis.zRangeWithScores(votekey, 0, -1, { REV: true });

                io.to(roomId).emit('addSong', songs)
            })

            socket.on('upvote', async ({roomId, songTitle})=> {
                const votekey = `room:${roomId}:votes`
                const songtitle = songTitle

                await redis.zIncrBy(votekey, 1, songtitle);

                const result = await redis.zRangeWithScores(votekey, 0, -1, { REV: true });

                if (result.length === 0) {
                    // throw new Error('No songs found in the room.');
                    return console.log("No song found!");
                }

                io.to(roomId).emit('upvote', { result })
            })

            socket.on('downvote', async ({roomId, songTitle})=> {
                const votekey = `room:${roomId}:votes`
                const songtitle = songTitle

                await redis.zIncrBy(votekey, -1, songtitle)

                const result = await redis.zRangeWithScores(votekey, 0, -1, { REV: true });

                if (result.length === 0) {
                    // throw new Error('No songs found in the room.');
                    return console.log("No song found!");
                }

                io.to(roomId).emit('downvote', { result })
            })

        })
    }

    get io(){
        return this._io
    }
}

export default SocketService
