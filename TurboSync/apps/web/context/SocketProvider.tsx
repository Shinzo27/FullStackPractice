"use client";
import { redirect } from "next/navigation";
import React, { useCallback, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
interface SocketProviderProps {
  children: React.ReactNode;
}

interface iSocketContext {
    socket: Socket | undefined;
    joinRoom: ({roomId, username}: { roomId: string, username: string }) => any;
    leaveRoom: (roomId: string) => any;
    checkRoom: (roomId: string, callback: (user: string) => void) => any;
    addSong: (songId: string) => any;
}

const SocketContext = React.createContext<iSocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return state;
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = React.useState<Socket>();

    const joinRoom = useCallback(({roomId, username}: { roomId: string, username: string }) => {
        if (socket) {
            socket.emit("joinRoom", { roomId: roomId, username: username });
            redirect(`/room/${roomId}`)
        }
        console.log("Join room " + roomId);
    }, [socket]);

    const leaveRoom = useCallback((roomId: string) => {
        if (socket) {
            socket.emit("leaveRoom", roomId);
        }
        console.log("Leave room " + roomId);
    }, [socket]);

    const checkRoom = useCallback((roomId: string, callback: (user: string) => void) => {
        if (socket) {
            socket.emit("checkRoom", roomId, callback);
        }
        console.log("Check room " + roomId);
    }, [socket]);

    const addSong = useCallback((songId: string) => {
        if (socket) {
            socket.emit("addSong", songId);
        }
    }, [socket]);

    useEffect(() => {
        const _socket = io("http://localhost:8000");
        setSocket(_socket)
        
        return () => {
            _socket.disconnect()
            setSocket(undefined)
        }
    },[])
    
    return (
        <SocketContext.Provider value={{ joinRoom: joinRoom, leaveRoom: leaveRoom, checkRoom: checkRoom, socket: socket, addSong: addSong }}>
            {children}
        </SocketContext.Provider>
    );
}

export default SocketProvider;