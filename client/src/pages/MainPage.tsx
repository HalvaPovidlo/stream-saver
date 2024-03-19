import {observer} from "mobx-react-lite";


import RecordList from "../components/RecordList.jsx";
import FollowList from "../components/FollowList.jsx";
import {useContext, useEffect, useState} from "react";
import {fetchActiveFollows,  fetchRecords} from "../http/recordAPI.jsx";
import Context from "../Context.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import {useNavigate} from "react-router-dom";

const MainPage = observer(() => {
    const {records} = useContext(Context)

    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [playerOptions, setPlayerOptions] = useState(null)
    const openPlayer = (videoURL) => {
        setPlayerOptions({
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
        <RecordList openPlayer={openPlayer}/>
        <FollowList/>
        <VideoPlayer isPlayerOpen={isPlayerOpen} videoJsOptions={playerOptions}
                     handleClose={handleClose}></VideoPlayer>
    </div>

})

export default MainPage;
