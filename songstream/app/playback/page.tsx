"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const route = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const [player, setPlayer] = useState<any>(undefined);

  useEffect(() => {
    if (!accessToken) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "My Web App Player",
        getOAuthToken: (cb) => cb(accessToken),
        volume: 0.5,
      });

      player.connect();

      // Handle player events
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        // Transfer playback to the device
        transferPlaybackHere(accessToken, device_id);
      });
    };
  }, [accessToken]);

  const transferPlaybackHere = async (accessToken:any, deviceId:any) => {
    await fetch("https://api.spotify.com/v1/me/player", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        device_ids: [deviceId],
        play: true,
      }),
    });
  };

  return <div>Enter</div>;
};

export default route;
