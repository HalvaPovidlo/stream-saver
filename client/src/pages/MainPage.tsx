import {observer} from "mobx-react-lite";


import RecordList from "../components/RecordList";
import FollowList from "../components/FollowList";
import {useContext, useEffect, useState} from "react";
import {fetchActiveFollows,  fetchRecords} from "../http/recordAPI";
import Context from "../Context";
import VideoPlayer from "../components/VideoPlayer";
import {useNavigate} from "react-router-dom";
import React from "react";

const MainPage = observer(() => {
    // @ts-expect-error TS(2339): Property 'records' does not exist on type 'null'.
    const {records} = useContext(Context)

    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [playerOptions, setPlayerOptions] = useState(null)
    const openPlayer = (videoURL: any) => {
        setPlayerOptions({
            // @ts-expect-error TS(2345): Argument of type '{ autoplay: boolean; controls: b... Remove this comment to see the full error message
            autoplay:true,
            controls: true,
            fluid: true,
            sources: [{
                src: videoURL,
                type: 'video/mp4'
            }],
        })
        setIsPlayerOpen(true)
    };

    const handleClose = () => setIsPlayerOpen(false);


    useEffect(() => {
        fetchRecords()
            .then(data => {
                records.setRecords(data)})
            .catch(e => alert(e))

        fetchActiveFollows()
            .then(data => {
                records.setActiveFollows(data)
            })
            .catch(e => alert(e))

    })

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    }}>
        {//  @ts-expect-error
        <RecordList openPlayer={openPlayer}/>
        }
        <FollowList/>
        <VideoPlayer isPlayerOpen={isPlayerOpen} videoJsOptions={playerOptions}
                     handleClose={handleClose}></VideoPlayer>
    </div>

})

export default MainPage;
