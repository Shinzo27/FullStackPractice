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
                    const user = await redis.sMembers(userKey)
                    io.to(roomId).emit('joinRoom', {username, user})

                    console.log(`${username} joined room ${roomId}`)
                } catch (error) {
                    console.log(error); 
                }
            })

            socket.on('leaveRoom', async({roomId, username}: { roomId: string, username: string })=> {
                console.log("Leave room " + roomId + " by " + username)
                const userKey = `room:${roomId}:users`
                await redis.sRem(userKey, username)
                const users = await redis.sMembers(userKey)
                socket.leave(roomId)
                io.to(roomId).emit("leaveRoom", {roomId, username, users})
            })

            socket.on('checkRoom', async (roomId)=> {
                const userKey = `room:${roomId}:users`
                const user = await redis.sMembers(userKey)
                const votekey = `room:${roomId}:votes`
                const currentSongKey = `room:${roomId}:current_song`;

                const playlist = await redis.zRangeWithScores(votekey, 0, -1, { REV: true });
                const current_song = await redis.get(currentSongKey)
                
                io.to(roomId).emit("checkRoom", {user, playlist, current_song})
            })

            socket.on('addSong', async ({roomId, song})=> {
                const votekey = `room:${roomId}:votes`
                const currentSongKey = `room:${roomId}:current_song`;

                const current_song = await redis.get(currentSongKey)

                if(!current_song){
                    await redis.set(currentSongKey, song)
                }

                const newCurrentSong = await redis.get(currentSongKey)

                await redis.zAdd(votekey, { score: 0, value: song });

                const songs = await redis.zRangeWithScores(votekey, 0, -1, { REV: true });
                io.to(roomId).emit('currentSong', newCurrentSong)
                io.to(roomId).emit('addSong', {songs, currentSong: newCurrentSong})
            })

            socket.on('upvote', async ({roomId, songTitle})=> {
                const votekey = `room:${roomId}:votes`
                const songtitle = JSON.stringify(songTitle)
                console.log(songtitle)

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

            socket.on("nextsong", async (roomId) => {
                const votekey = `room:${roomId}:votes`
                const currentSongKey = `room:${roomId}:current_song`;

                const nextSong = await redis.zPopMax(votekey)
                
                const songs = await redis.zRangeWithScores(votekey, 0, -1, { REV: true });
                
                if(songs.length === 0){
                    io.emit("nextsong", { message: "No song found!" })
                    return
                }
                
                console.log(songs[0].value)

                await redis.set(currentSongKey, songs[0].value)

                io.to(roomId).emit("nextsong",  songs[0].value)
            })
        })
    }

    get io(){
        return this._io
    }
}

export default SocketService
