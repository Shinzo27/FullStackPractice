"use client";
import React, { useEffect, useState } from "react";
import { useSocket } from "../../../context/SocketProvider";
import { redirect } from "next/navigation";

export function page ({ params }: { params: Promise<{ id: string }> }) {    
    const id = React.use(params);
    const roomId = id.id
    const { checkRoom, socket, leaveRoom, addSong } = useSocket();
    const [users, setUsers] = React.useState<any>([])
    const [url, setUrl] = useState<string>("")
    const [songs, setSongs] = useState<string[]>([])

    useEffect(() => {
        async function checkRooms() {
            await checkRoom(roomId, (user)=>{
                const userParsed = JSON.parse(user)
                setUsers(userParsed.user)
                console.log(userParsed)
            })
        }
        checkRooms()
    }, [])

    useEffect(()=>{
        socket?.on('checkRoom', (message)=>{
            const data = JSON.parse(message)
            console.log(data)
            setUsers(data.user)
        })
        socket?.on('addSong', (message)=>{
            setSongs((prevSongs)=>[...prevSongs, message])
        })

        return () => {
            socket?.off('addSong');
            socket?.off('checkRoom');
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
        if(youtubeId){
            addSong({roomId: roomId, songId: youtubeId})
        }
        setUrl("")
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
                        { songs.map((song : string)=>{
                            return <div key={song}>{song}</div>
                        })}
                    </div>
                    : null
                }
            </div>
        </>
    );
}

export default page;