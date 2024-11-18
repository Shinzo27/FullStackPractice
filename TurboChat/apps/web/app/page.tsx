"use client";
import React from "react";
import { useSocket } from "../context/SocketProvider";

export default function Home() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = React.useState("");

  return (
    <div>
      <h1>Hello World</h1>
      {
        messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))
      }
      <input type="text" name="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendMessage(message)}>Send</button>
    </div>
  );
}
