import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css'

export const VideoJs = (props: any) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      videoRef.current.appendChild(videoElement);

      // @ts-expect-error TS(2322): Type 'Player' is not assignable to type 'null'.
      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      // @ts-expect-error TS(2339): Property 'autoplay' does not exist on type 'never'... Remove this comment to see the full error message
      player.autoplay(options.autoplay);
      // @ts-expect-error TS(2339): Property 'src' does not exist on type 'never'.
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      // @ts-expect-error TS(2339): Property 'isDisposed' does not exist on type 'neve... Remove this comment to see the full error message
      if (player && !player.isDisposed()) {
        // @ts-expect-error TS(2339): Property 'dispose' does not exist on type 'never'.
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJs;