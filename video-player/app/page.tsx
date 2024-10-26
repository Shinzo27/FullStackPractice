import Image from "next/image";
import Video from 'next-video'
import getStarted from '@/videos/get-started.mp4'

export default function Home() {
  return (
    <>
      <h1>Video Player</h1>
      <Video src={getStarted} autoPlay={true} loop={true} muted={true} />
    </>
  );
}
