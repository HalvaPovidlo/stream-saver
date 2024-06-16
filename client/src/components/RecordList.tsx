import {useContext, useEffect, useState} from "react";
import Context from "../Context";
import {List, ListItem, Typography} from "@mui/material";

import {observer} from "mobx-react-lite";
import {Record} from "../store/RecordStore";
import ChannelCarousel from "./ChannelCarousel";
import React from "react";

interface IRecordListProps {
    openPlayer: (videoURL: string) => void;
}

const RecordList = observer((props: IRecordListProps) => {
    const {recordStore} = useContext(Context);
    const [groupedData, setGroupedData] = useState<Record[][]>([]);

    useEffect(() => {
        setGroupedData(recordStore.groupVideosByChannelName());
    }, [recordStore, recordStore.records]);

    return (
        <List>
            <Typography sx={{marginBottom: "10px"}} variant="h4">
                Recorded videos
            </Typography>
            {groupedData.map((d) => (
                <ListItem key={d[0].channel.name}>
                    {<Typography variant={"h5"}>{d[0].channel.name}:</Typography>}
                    <ChannelCarousel
                        openPlayer={props.openPlayer}
                        channelRecords={d}
                    />
                </ListItem>
            ))}
        </List>
    );
});
export default RecordList;

