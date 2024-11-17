"use client";
import { useEffect } from 'react';

const VideoPage = ({ params }: { params: { videoId: string } }) => {
    const videoId = params.videoId;

    useEffect(() => {
        console.log(videoId);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>YouTube Video Player</h1>
            {videoId ? (
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default VideoPage;