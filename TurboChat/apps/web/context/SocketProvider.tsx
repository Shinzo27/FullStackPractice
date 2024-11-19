"use client";
import React, { useCallback, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (message: string) => any;
  messages: string[];
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
  const [message, setMessage] = React.useState<string[]>([]);

  const sendMessage: ISocketContext["sendMessage"] = useCallback((message: string) => {
      console.log("Send message " + message);
      if(socket) {
        socket.emit("event:message", { message });
      }
  },[socket]);

    useEffect(()=>{
        const _socket = io("http://localhost:8000");
        _socket.on("event:message", onMessageReceived);
        setSocket(_socket);
        return () => {
            _socket.disconnect();
            _socket.off("event:message", onMessageReceived);
            setSocket(undefined)
        }
    }, [])

    const onMessageReceived = useCallback((msg: string) => {
      console.log("Message received : " + msg);
      const { message } = JSON.parse(msg) as { message: string };
      setMessage((prev) => [...prev, message]);
    }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages: message }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
