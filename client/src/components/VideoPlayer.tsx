import {Box, Modal} from "@mui/material";
import VideoJS from "./VideoJs.jsx";


const VideoPlayer = (props) => {
    return (
        <Modal className='modal-size'
               open={props.isPlayerOpen}
               onClose={props.handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
        >
            <Box>
                <VideoJS className='video-player' options={props.videoJsOptions}/>
            </Box>
        </Modal>
    );
};

export default VideoPlayer;