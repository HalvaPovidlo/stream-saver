import React, {useState} from 'react';
import {Card, CardContent, CardMedia, ImageListItem, Link} from "@mui/material";
import previewAltImg from "/preview_not_found.png"
import VideoJS from "./VideoJs.jsx";

const Record = (props) => {

    const {record, setVideoJsOptions, handleOpen} = props
    const [isHovered, setIsHovered] = useState(false);
    const videoOptions = {
        autoplay: true,
        controls: true,
        fluid: true,
        muted: true,
        sources: [{
            src: `${import.meta.env.VITE_REACT_APP_API_URL}api/video/${record.id}/file/?token=${localStorage.getItem('token')}`,
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
        setVideoJsOptions(videoOptions)
        handleOpen();
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
                    <VideoJS options={videoOptions} onReady={handlePlayerReady}/>}
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