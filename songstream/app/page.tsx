"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const loadSpotifySDK = () => {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Spotify Web Playback SDK script loaded.");
      };

      script.onerror = () => {
        console.error("Failed to load Spotify Web Playback SDK.");
      };
    };

    // Load the Spotify SDK if it's not already loaded
    if (!window.Spotify) {
      loadSpotifySDK();
    }

    // Define the callback for when the SDK is ready
    window.onSpotifyWebPlaybackSDKReady = () => {
      console.log("Spotify SDK is ready!");
      const token = "your_access_token"; // Replace with your Spotify access token
      const player = new window.Spotify.Player({
        name: "My Spotify Player",
        getOAuthToken: (cb:any) => cb(token),
        volume: 0.5,
      });

      player.addListener("ready", ({ device_id }: any) => {
        console.log("Device ID:", device_id);
      });

      player.addListener("not_ready", ({ device_id }: any) => {
        console.log("Device went offline:", device_id);
      });

      player.connect();
    };
  }, []);
  
  return (
    <>
      Spotify
    </>
  )
}
