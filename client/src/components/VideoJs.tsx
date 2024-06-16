import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import {IVideoJSConfig} from "../pages/MainPage";
import Player from "video.js/dist/types/player";

interface IVideoJsProps {
    options: IVideoJSConfig|null;
}

export const VideoJs = (props: IVideoJsProps) => {

    const videoRef = React.useRef<HTMLDivElement | null>(null);
    const playerRef = React.useRef<Player | null>(null);
    const {options} = props;

    React.useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current?.appendChild(videoElement);

            playerRef.current = videojs(videoElement, options);

        } else {
            const player = playerRef.current;
            //chk
            player.autoplay(options?.autoplay);
            player.src(options?.sources);
        }
    }, [options, videoRef]);

    // Dispose the Video.js player when the functional component unmounts
    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef}/>
        </div>
    );
};

export default VideoJs;
