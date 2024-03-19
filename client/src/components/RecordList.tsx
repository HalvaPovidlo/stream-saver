import { useContext, useEffect, useState } from "react";
import Context from "../Context";
import { List, Typography } from "@mui/material";

import { observer } from "mobx-react-lite";
import Record from "./Record";
import ChannelCarousel from "./ChannelCarousel";
import React from "react";

const RecordList = observer((props) => {
  // @ts-expect-error TS(2339): Property 'records' does not exist on type 'null'.
  const { records } = useContext(Context);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    setGroupedData(records.groupVideosByChannelName());
  }, [records.records]); //recheck

  return (
    <List>
      <Typography sx={{ marginBottom: "10px" }} variant="h4">
        Recorded videos
      </Typography>
      {groupedData.map((d) => (
        <>
          {
            // @ts-expect-error
            <Typography variant={"h5"}>{d[0].channel.name}:</Typography>
          }
          <ChannelCarousel
            // @ts-expect-error TS(2339): Property 'openPlayer' does not exist on type 'obje... Remove this comment to see the full error message
            openPlayer={props.openPlayer}
            channelRecords={d}
            // @ts-expect-error TS(2339): Property 'channelName' does not exist on type 'nev... Remove this comment to see the full error message
            key={d.channelName}
          />
        </>
      ))}
    </List>
  );
});
export default RecordList;
// <Record key={r.id} openPlayer={props.openPlayer}    record={r}></Record>
//
