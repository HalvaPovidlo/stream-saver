import {useContext, useState} from 'react';
import Context from "../Context.jsx";
import {Box, List, ListItemButton, Modal, Typography} from "@mui/material";
import VideoJS from "./VideoJs.jsx";
import {observer} from "mobx-react-lite";

const RecordList = observer((props) => {
    const {records} = useContext(Context)


    return (<List sx={{margin: "20px"}}>
        <Typography sx={{marginBottom: "20px"}} variant="h4" component="h2">
            Recorded videos
        </Typography>
        {records.records.map(r => <ListItemButton
            onClick={() => {
                props.setVideoJsOptions({
                    autoplay: true,
                    controls: true,
                    /*responsive: true,*/
                    fluid: true,
                    sources: [{
                        src: `${import.meta.env.VITE_REACT_APP_API_URL}api/video/file/${r.id}/?token=${localStorage.getItem('token')}`,
                        type: 'video/mp4'
                    }]
                })
                props.handleOpen();
            }}
            key={r.id}>
            {r.name}
        </ListItemButton>)}

    </List>)
})

export default RecordList;