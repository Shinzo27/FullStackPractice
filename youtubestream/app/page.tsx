"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const router = useRouter();

  const extractVideoId = (url:string) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  const handlePlayVideo = () => {
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      router.push(`/video/${videoId}`);
    } else {
      alert("Please enter a valid YouTube URL");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>YouTube Video Player</h1>
      <input
        type="text"
        placeholder="Enter YouTube Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ width: "70%", padding: "10px", fontSize: "16px" }}
      />
      <button
        onClick={handlePlayVideo}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Play Video
      </button>
    </div>
  );
}
