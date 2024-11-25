"use client";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import React, { useEffect } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Home() {
  const [username, setUsername] = React.useState<string>("");
  const [roomId, setRoomId] = React.useState<string>("");
  const { joinRoom } = useSocket();

  return (
    <div>
      <h1>Hello world!</h1>
      <input type="text" placeholder="Enter room name" value={roomId} onChange={(e)=>setRoomId(e.target.value)} /><br/><br/>
      <input type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)} />
      <button onClick={()=>joinRoom({roomId, username})}>Join Room</button>
    </div>
  );
}
