"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketProvider";
import { redirect } from "next/navigation";

interface iSong {
    value: string;
    score: number;
}

export function page ({ params }: { params: Promise<{ id: string }> }) {    
    const id = React.use(params);
    const roomId = id.id
    const { checkRoom, socket, leaveRoom, addSong, upvote, downvote } = useSocket();
    const [users, setUsers] = React.useState<any>([])
    const [url, setUrl] = useState<string>("")
    const [songs, setSongs] = useState<iSong[]>([])

    useEffect(() => {
        async function checkRooms() {
            await checkRoom(roomId, (result)=>{
                const resultParsed = JSON.parse(result)
                // setUsers(userParsed.user)
                console.log(resultParsed)
                setUsers(resultParsed.user)
                setSongs(resultParsed.playlist)
            })
        }
        checkRooms()
    }, [])

    useEffect(()=>{
        socket?.on('checkRoom', (message)=>{
            const data = JSON.parse(message)
            console.log(data)
            setUsers(data.user)
            setSongs(data.playlist)
        })
        socket?.on('addSong', (message)=>{
            setSongs(message)
        })
        socket?.on('upvote', (message)=>{
            setSongs(message.result)
        })
        socket?.on('downvote', (message)=>{
            setSongs(message.result)
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

    const handleDownvote = ({songTitle}: { songTitle: string }) => {
        const checkVote = songs.find((song)=>song.value === songTitle)
        if(checkVote){
            if(checkVote.score === 0){
                alert("You can't downvote a song that has already been downvoted")
                return
            }
        }
        downvote({roomId: roomId, songtitle: songTitle})
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
                            return <div key={song.value} className="flex items-center">
                                <div>
                                    {song.value}
                                </div>
                                <div>
                                    Votes: {song.score}
                                </div>
                                <div>
                                    <button onClick={()=>handleUpvote({songTitle: song.value})}>
                                        Upvote
                                    </button>
                                </div>
                                <div>
                                    <button onClick={()=>handleDownvote({songTitle: song.value})}>
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