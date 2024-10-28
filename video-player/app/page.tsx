import MuxPlayer from "@mux/mux-player-react";

export default function Home() {
  return (
    <>
      <h1>Video Player</h1>
      <MuxPlayer
        streamType="on-demand"
        playbackId="i100EPjMIn101IZKcfwNyHfbp3LB8a9bggABjzevvmKi4"
        metadataVideoTitle="Placeholder (optional)"
        metadataViewerUserId="Placeholder (optional)"
        primaryColor="#FFFFFF"
        secondaryColor="#000000"
      />
    </>
  );
}
