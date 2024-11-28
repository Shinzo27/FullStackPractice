"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../../context/SocketProvider";
import { redirect } from "next/navigation";

interface iSong {
  value: {
    title: string;
    youtubeId: string;
  };
  score: number;
}

interface iCurrentSong {
  title: string;
  youtubeId: string;
}

export function page({ params }: { params: Promise<{ id: string }> }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const id = React.use(params);
  const roomId = id.id;
  const { socket, leaveRoom, addSong, upvote, downvote } = useSocket();
  const [users, setUsers] = React.useState<any>([]);
  const [url, setUrl] = useState<string>("");
  const [songs, setSongs] = useState<iSong[]>([]);
  const [currentSong, setCurrentSong] = useState<iCurrentSong>();
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if(!currentSong) return;
    console.log("use effect called!");
    if (!(window as any).YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player("youtube-player", {
        height: "390",
        width: "640",
        videoId: currentSong?.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => console.log("Player is ready"),
        },
      });
    };
  }, [currentSong]);

  const togglePlayPause = () => {
    if (playerRef) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    }
  };

  const removeSong = (songName: string) => {
    setSongs(songs.filter((song) => song.value.title !== songName));
  };

  const changeSong = async() => {
    if(socket){
      socket.emit("nextsong", roomId)
    }
  };

  useEffect(() => {
    if(socket){
      socket.emit("checkRoom", roomId)
    }

    if(socket){
      socket.on("checkRoom", (result) => {
        console.log(result)
        if(result.current_song !== null){ 
          const newCurrentSong = JSON.parse(result.current_song)
          console.log(newCurrentSong)
          setCurrentSong(newCurrentSong)
        }
        const users = result.user;
        const playlist = result.playlist;
        setUsers(users);
        setSongs(playlist);
      });
    }

    if (socket) {
      socket.on("joinRoom", (message) => {
        console.log("User Joined");
        console.log(message);
        alert(`${message.username} joined the room`);
        setUsers(message.user);
      });
    }

    if (socket) {
      socket.on("leaveRoom", (message) => {
        alert(`${message.username} left the room`);
        setUsers(message.users);
      });
    }

    if(socket){
      socket.on("nextsong", (message) => {
        if(message.message){
          return alert(message.message)
        }
        const parsedSong = JSON.parse(message);
        setCurrentSong(parsedSong);
        if (playerRef.current) {
          playerRef.current.loadVideoById(parsedSong.youtubeId);
        } else {
          console.log("Player not found")
        }
      });
    }

    return () => {
      socket?.off("checkRoom");
      socket?.off("joinRoom");
      socket?.off("leaveRoom");
      socket?.off("nextsong");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("addSong", (message) => {
      console.log(message)
      const parsedSong = message.songs.map((song: any) => ({
        value: JSON.parse(song.value),
        score: song.score,
      }));
      console.log(parsedSong);
      setSongs(parsedSong);
      const parsedCurrentSong = JSON.parse(message.currentSong)
      console.log(parsedCurrentSong);
      setCurrentSong(parsedCurrentSong);
    });
    socket?.on("upvote", (message) => {
      console.log(message);
      const parsedSong = message.result.map((song: any) => ({
        value: JSON.parse(song.value),
        score: song.score,
      }));
      setSongs(parsedSong);
    });
    socket?.on("downvote", (message) => {
      console.log(message);
        const parsedSong = message.result.map((song: any) => ({
        value: JSON.parse(song.value),
        score: song.score,
      }));
      setSongs(parsedSong);
    });

    return () => {
      socket?.off("addSong");
      socket?.off("checkRoom");
      socket?.off("upvote");
    };
  }, [socket]);

  const handleLeaveRoom = () => {
    leaveRoom(roomId);
    redirect("/");
  };

  const extractYoutubeID = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2]?.length === 11 ? match[2] : null;
  };

  const handleAddSong = () => {
    const youtubeId = extractYoutubeID(url);
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    const requrl = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=snippet,contentDetails&key=${API_KEY}`;
    fetch(requrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.items.length > 0) {
          const title = data.items[0].snippet.title;
          addSong({
            roomId: roomId,
            song: { title: title, youtubeId: youtubeId || "" },
          });
        } else {
          alert("No video found");
        }
      });
    setUrl("");
  };

  const handleUpvote = ({ songTitle }: { songTitle: iSong[] }) => {
    upvote({ roomId: roomId, songtitle: songTitle });
  };

  const handleDownvote = ({ songTitle }: { songTitle: string }) => {
    const checkVote = songs.find((song) => song.value.title === songTitle);
    if (checkVote) {
      if (checkVote.score === 0) {
        alert("You can't downvote a song that has already been downvoted");
        return;
      }
    }
    downvote({ roomId: roomId, songtitle: songTitle });
  };
  return (
    <>
      <div>Joined Room {roomId}</div>
      <div>
        Users:
        {users.length > 0
          ? users.map((user: string) => {
              return <div key={user}>{user}</div>;
            })
          : null}
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter The url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleAddSong}>Add to Queue</button>
      </div>
      <div>
        <button onClick={handleLeaveRoom}>Leave Room</button>
      </div>
      <div>
        {songs.length > 0 ? (
          <div>
            Songs:
            {songs.map((song: any, index: number) => (
                <div key={index} className="flex items-center">
                  <div>{song.value.title}</div>
                  <div>Votes: {song.score}</div>
                  <div>
                    <button
                      onClick={() => handleUpvote({ songTitle: song.value })}
                    >
                      Upvote
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDownvote({ songTitle: song.value })}
                    >
                      Downvote
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          <div>No Songs Added Yet</div>
        )}
      </div>
      <div className="aspect-video w-full relative h-96">
        <div id="youtube-player" className="absolute inset-0" ref={playerRef}></div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          {/* <h3 className="text-lg font-semibold">{currentSong?.value.title}</h3> */}
          <p className="text-sm text-gray-500 dark:text-gray-400">{"ABCD"}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={togglePlayPause}>
            {isPlaying ? <div>Pause</div> : <div>Play</div>}
          </button>
          <button onClick={()=>changeSong()}>
            Skip</button>
        </div>
      </div>
    </>
  );
}

export default page;
