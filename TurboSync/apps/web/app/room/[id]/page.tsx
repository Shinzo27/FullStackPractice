"use client";
import React, { useEffect } from "react";
import { useSocket } from "../../../context/SocketProvider";
import { redirect } from "next/navigation";

export function page ({ params }: { params: Promise<{ id: string }> }) {    
    const id = React.use(params);
    const roomId = id.id
    const { checkRoom, socket, leaveRoom } = useSocket();
    const [users, setUsers] = React.useState<any>([])

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
            console.log("Message received " + message)
            const data = JSON.parse(message)
            console.log(data)
            setUsers(data.user)
        })
    }, [socket])

    const handleLeaveRoom = () => {
        leaveRoom(roomId)
        redirect('/')
    }

    return (
        <>
            <div>
                Joined Room { roomId }
            </div>
            <div>
                { users.map((user : { id: string, username: string })=>{
                    return <div key={user.id}>{user.username}</div>
                })}
            </div>
            <div>
                <button onClick={handleLeaveRoom}>
                    Leave Room
                </button>
            </div>
        </>
    );
}

export default page;