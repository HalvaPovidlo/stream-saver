import React, {useState} from 'react';
import {Box, Card, CardContent, CardMedia, ImageListItem, Link, Typography} from "@mui/material";
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
        <Card
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="record-card"
        >
            <CardContent sx={{padding: "0px"}}>
                {!isHovered ?
                    <CardMedia

                        component="img"
                        image={`${import.meta.env.VITE_REACT_APP_API_URL}api/video/${record.id}/previewImage/?token=${localStorage.getItem('token')}`}
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
                <Box sx={{padding: "5px"}}>
                    <Link sx={{cursor: "pointer", textDecoration: "none"}}>
                        <Typography sx={{textOverflow: 'ellipsis', overflow: "hidden", whiteSpace: "nowrap"}}
                                    variant="h6">{record.name}</Typography>
                        <Typography sx={{textOverflow: 'ellipsis', overflow: "hidden", whiteSpace: "nowrap",fontWeight:"bold"}}
                                    variant="h5">{record.channel.name}</Typography>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
};


export default Record;