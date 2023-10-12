import React, {useState} from 'react';
import {Card, CardContent, CardMedia, ImageListItem, Link} from "@mui/material";
import previewAltImg from "/preview_not_found.png"
import VideoJS from "./VideoJs.jsx";

const Record = (props) => {
    const {record, openPlayer} = props

    const [isHovered, setIsHovered] = useState(false);
    const videoSrc = `${import.meta.env.VITE_REACT_APP_API_URL}api/video/${record.id}/file/?token=${localStorage.getItem('token')}`

    const previewVideoOptions = {
        className: "preview-player",
        autoplay: true,
        controls: true,
        fluid: true,
        muted: true,
        sources: [{
            src: videoSrc,
            type: 'video/mp4'
        }],
        controlBar: {
            playToggle: false,
            volumePanel: false,
            remainingTimeDisplay: false,
            progressControl: true,
            pictureInPictureToggle: false,
            fullscreenToggle: false
        },
    }


    function handleClick() {
        openPlayer(videoSrc);
    }

    function handlePlayerReady(player) {
        var controlBar = player.controlBar;
        controlBar.on('click', function (event) {
            // prevents opening player when user clicks progressBar
            event.stopPropagation();
        });
    }

    return (
        <Card sx={{width: 330, height: 260, margin: 5, backgroundColor: "transparent"}}
              onClick={handleClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="record-card"
        >
            <CardContent>
                {!isHovered ?
                    <CardMedia
                        component="img"
                        image={`${import.meta.env.VITE_REACT_APP_API_URL}api/video/${record.id}/previewImage/?token=${localStorage.getItem('token')}`}
                        width="100%"
                        alt={`${record.name}`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = previewAltImg;
                            console.log(e)
                        }}
                    >
                    </CardMedia>
                    :
                    <VideoJS options={previewVideoOptions} onReady={handlePlayerReady}/>}
                <Link>
                    {
                        record.name
                    }
                </Link>
            </CardContent>
        </Card>
    );
};


export default Record;