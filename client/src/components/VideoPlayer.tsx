import {Box, Modal} from "@mui/material";
import VideoJS from "./VideoJs";
import React from "react";
import {IVideoJSConfig} from "../pages/MainPage";

interface IVideoPlayerProps {
    isPlayerOpen: boolean;
    handleClose: (value: React.SetStateAction<boolean>) => void;
    playerOptions: IVideoJSConfig | null
}

const VideoPlayer = (props: IVideoPlayerProps) => {
    return (
        <Modal className='modal-size'
               open={props.isPlayerOpen}
               onClose={props.handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
        >
            <Box>
                <VideoJS options={props.playerOptions}/>
            </Box>
        </Modal>
    );
};

export default VideoPlayer;