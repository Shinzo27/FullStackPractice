import { Server } from "socket.io"
import redis from "./redisService";

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

            socket.on('joinRoom', async({roomId, username})=> {
                try {
                    console.log("room id " + roomId)
                    console.log("username " + username)
                    const userKey = `room:${roomId}:users`
                    await redis.sAdd(userKey, username)

                    socket.join(roomId)
                    io.to(roomId).emit('joinRoom', username)

                    console.log(`${username} joined room ${roomId}`)
                } catch (error) {
                    console.log(error); 
                }
            })

            socket.on('leaveRoom', async({roomId, username}: { roomId: string, username: string })=> {
                console.log("Leave room " + roomId + " by " + username)
                const userKey = `room:${roomId}:users`
                await redis.sRem(userKey, username)
                socket.leave(roomId)
            })

            socket.on('checkRoom', async (roomId, callback)=> {
                const userKey = `room:${roomId}:users`
                const user = await redis.sMembers(userKey)
                callback(user)
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

            socket.on('disconnect', async ()=> {
                try {
                    const { roomId, username } = socket.data 
                    console.log(roomId)
                    console.log(username)
                    const userKey = `room:${roomId}:users`
                    await redis.sRem(userKey, username)

                    socket.to(roomId).emit('disconnect', username)

                    console.log(`${username} left room ${roomId}`)
                } catch (error) {
                    
                }
            })
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService
