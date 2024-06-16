import { observer } from "mobx-react-lite";

import RecordList from "../components/RecordList";
import FollowList from "../components/FollowList";
import { useContext, useEffect, useState } from "react";
import { fetchActiveFollows, fetchRecords } from "../http/recordAPI";
import Context from "../Context";
import VideoPlayer from "../components/VideoPlayer";

import React from "react";

export interface IVideoJSSource {
    src: string;
    type: string;
  }

export interface IVideoJSConfig {
    autoplay: boolean;
    controls: boolean;
    fluid: boolean;
    sources: IVideoJSSource[];
  }

const MainPage = observer(() => {
  const { recordStore } = useContext(Context);

  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [playerOptions, setPlayerOptions] = useState<IVideoJSConfig | null>(null);
  //todo: add separate page for watching record
  const openPlayer = (videoURL: string) => {
    setPlayerOptions({
      autoplay: true,
      controls: true,
      fluid: true,
      sources: [
        {
          src: videoURL,
          type: "video/mp4",
        },
      ],
    });
    setIsPlayerOpen(true);
  };



  useEffect(() => {
    fetchRecords()
      .then((data) => {
        recordStore.setRecords(data);
      })
      .catch((e) => alert(e));

    fetchActiveFollows()
      .then((data) => {
        recordStore.setActiveFollows(data);
      })
      .catch((e) => alert(e));
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {
        <RecordList openPlayer={openPlayer} />
      }
      <FollowList />
      <VideoPlayer
        isPlayerOpen={isPlayerOpen}
        handleClose={ ()=>setIsPlayerOpen(false) }
        playerOptions={playerOptions}
      ></VideoPlayer>
    </div>
  );
});

export default MainPage;
