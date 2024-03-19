import {useContext, useEffect, useState,} from 'react';
import Context from "../Context.jsx";
import {List, Typography} from "@mui/material";

import {observer} from "mobx-react-lite";
import Record from "./Record.jsx";
import ChannelCarousel from "./ChannelCarousel.jsx";

const RecordList = observer((props) => {
    const {records} = useContext(Context)
    const [groupedData, setGroupedData] = useState([])

    useEffect(() => {
        setGroupedData(records.groupVideosByChannelName())
    }, [records.records])//recheck

    return (
        <List>
            <Typography sx={{marginBottom: "10px"}} variant="h4">
                Recorded videos
            </Typography>
            {groupedData.map(d =>
                <>
                    <Typography variant={'h5'}>{d[0].channel.name}:</Typography>
                    <ChannelCarousel
                        openPlayer={props.openPlayer}
                        channelRecords={d}
                        key={d.channelName}/>
                </>
            )}
        </List>
    )
})
export default RecordList;
// <Record key={r.id} openPlayer={props.openPlayer}    record={r}></Record>
//