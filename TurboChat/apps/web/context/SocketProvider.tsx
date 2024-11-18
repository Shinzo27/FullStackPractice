"use client";
import React, { useCallback, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return state;
}

const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
}: SocketProviderProps) => {
  const [socket, setSocket] = React.useState<Socket>();

  const sendMessage: ISocketContext["sendMessage"] = useCallback((message: string) => {
      console.log("Send message " + message);
      if(socket) {
        socket.emit("event:message", { message });
      }
    },[socket]);

    useEffect(()=>{
        const _socket = io("http://localhost:8000");
        setSocket(_socket);

        return () => {
            _socket.disconnect();
            setSocket(undefined)
        }
    }, [])

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
