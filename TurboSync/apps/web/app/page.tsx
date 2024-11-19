"use client";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import React from "react";
import { useSocket } from "../context/SocketProvider";

export default function Home() {
  const { sendMessage } = useSocket();
  const [message, setMessage] = React.useState("");

  return (
    <div>
      <h1>Hello world!</h1>
      <input type="text" placeholder="Enter room name" value={message} onChange={(e)=>setMessage(e.target.value)} />
      <button onClick={()=>sendMessage(message)}>Join room</button>
    </div>
  );
}
