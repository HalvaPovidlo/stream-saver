import {useContext, useState} from 'react';
import Context from "../Context.jsx";
import {Box, Card, ImageListItem, List, ListItemButton, Modal, Typography} from "@mui/material";
import VideoJS from "./VideoJs.jsx";
import {observer} from "mobx-react-lite";
import Record from "./Record.jsx";

const RecordList = observer((props) => {
    const {records} = useContext(Context)


    return (
        <List sx={{margin: "20px"}}>
            <Typography sx={{marginBottom: "20px"}} variant="h4" component="h2">
                Recorded videos
            </Typography>
            {records.records.map(r =>
                <Record key={r.id} handleOpen={props.handleOpen} setVideoJsOptions={props.setVideoJsOptions}
                        record={r}></Record>)}
        </List>
    )
})
export default RecordList;