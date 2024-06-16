import React, {SyntheticEvent, useState} from "react";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Link,
    Typography,
} from "@mui/material";
import previewAltImg from "/preview_not_found.png";
import VideoJS from "./VideoJs";
import {Record} from "../store/RecordStore";


interface IRecordCardProps {
    record: Record;
    openPlayer: (videoURL: string) => void;
}

const RecordCard = (props: IRecordCardProps) => {
    const {record, openPlayer} = props;
    const [isHovered, setIsHovered] = useState(false);
    const videoSrc = `${import.meta.env.VITE_REACT_APP_API_URL}api/video/${
        record.id
    }/file/?token=${localStorage.getItem("token")}`;

    const previewVideoOptions = {
        className: "preview-player",
        autoplay: true,
        controls: true,
        fluid: true,
        muted: true,
        sources: [
            {
                src: videoSrc,
                type: "video/mp4",
            },
        ],
        controlBar: {
            playToggle: false,
            volumePanel: false,
            remainingTimeDisplay: false,
            progressControl: true,
            pictureInPictureToggle: false,
            fullscreenToggle: false,
        },
    };

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target instanceof Element && !e.target.classList.contains("vjs-control")) {
            openPlayer(videoSrc);
        }
    }


    return (
        <Card
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="record-card"
        >
            <CardContent sx={{padding: "0px"}}>
                {!isHovered ? (
                    <CardMedia
                        component="img"
                        image={`${import.meta.env.VITE_REACT_APP_API_URL}api/video/${
                            record.id
                        }/previewImage/?token=${localStorage.getItem("token")}`}
                        alt={`${record.name}`}
                        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = previewAltImg;
                        }}
                    ></CardMedia>
                ) : (
                    <VideoJS options={previewVideoOptions}/>
                )}
                <Box sx={{padding: "5px"}}>
                    <Link sx={{textDecoration: "none"}}>
                        <Typography
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                            }}
                            variant="h6"
                        >
                            {record.name}
                        </Typography>
                        <Typography
                            sx={{
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                fontWeight: "bold",
                            }}
                            variant="h5"
                        >
                            {record.channel.name}
                        </Typography>
                    </Link>
                </Box>
            </CardContent>
        </Card>
    );
};

export default RecordCard;
