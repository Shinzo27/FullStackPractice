"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketProvider";
import { redirect } from "next/navigation";

interface iSong {
    title: string;
    votes: number;
}

export function page ({ params }: { params: Promise<{ id: string }> }) {    
    const id = React.use(params);
    const roomId = id.id
    const { checkRoom, socket, leaveRoom, addSong, upvote } = useSocket();
    const [users, setUsers] = React.useState<any>([])
    const [url, setUrl] = useState<string>("")
    const [songs, setSongs] = useState<iSong[]>([])

    useEffect(() => {
        async function checkRooms() {
            await checkRoom(roomId, (user)=>{
                const userParsed = JSON.parse(user)
                console.log(userParsed)
                setUsers(userParsed.user)
            })
        }
        checkRooms()
    }, [])

    useEffect(()=>{
        socket?.on('checkRoom', (message)=>{
            const data = JSON.parse(message)
            setUsers(data.user)
        })
        socket?.on('addSong', (message)=>{
            console.log(message)
            setSongs((prevSongs)=>[...prevSongs, message.title])
        })
        socket?.on('upvote', (message)=>{
            console.log(message)
            setSongs((prevSongs)=>{
                const song = prevSongs.find((song)=>song.title === message.result[0].value)
                if(song){
                    song.votes = song.votes + 1
                }
                return [...prevSongs]
            })
        })

        return () => {
            socket?.off('addSong');
            socket?.off('checkRoom');
            socket?.off('upvote');
        };
    }, [socket])

    const handleLeaveRoom = () => {
        leaveRoom(roomId)
        redirect('/')
    }

    const extractYoutubeID = (url: string) => {
        console.log(url);
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2]?.length === 11) ? match[2] : null;
    }

    const handleAddSong = () => {
        const youtubeId = extractYoutubeID(url)
        const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
        const requrl = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=snippet,contentDetails&key=${API_KEY}`
        fetch(requrl)
            .then((response)=>response.json())
            .then((data)=>{
                if(data.items.length > 0){
                    const title = data.items[0].snippet.title
                    addSong({roomId: roomId, song: {title: title, youtubeId: youtubeId || ""}})
                } else {
                    alert("No video found")
                }
            })
        setUrl("")
    }

    const handleUpvote = ({songTitle}: { songTitle: string }) => {
        upvote({roomId: roomId, songtitle: songTitle})
    }
    return (
        <>
            <div>
                Joined Room { roomId }
            </div>
            <div>
                Users: 
                { users.map((user : { id: string, username: string })=>{
                    return <div key={user.id}>{user.username}</div>
                })}
            </div>
            <div>
                <input type="text" placeholder="Enter The url" value={url} onChange={(e)=>setUrl(e.target.value)} />
                <button onClick={handleAddSong}>Add to Queue</button>
            </div>
            <div>
                <button onClick={handleLeaveRoom}>
                    Leave Room
                </button>
            </div>
            <div>
                { 
                    songs.length > 0 ? 
                    <div>
                        Songs: 
                        { songs.map((song: any)=>{
                            return <div key={song} className="flex items-center">
                                <div>
                                    {song}
                                </div>
                                <div>
                                    Votes: {song.votes}
                                </div>
                                <div>
                                    <button onClick={()=>handleUpvote({songTitle: song})}>
                                        Upvote
                                    </button>
                                </div>
                                <div>
                                    <button>
                                        Downvote
                                    </button>
                                </div>
                            </div>
                        })}
                    </div>
                    : null
                }
            </div>
        </>
    );
}

export default page;