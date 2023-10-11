import {observer} from "mobx-react-lite";


import RecordList from "../components/RecordList.jsx";
import FollowList from "../components/FollowList.jsx";
import {useContext, useEffect, useState} from "react";
import {fetchChannels, fetchRecords} from "../http/recordAPI.jsx";
import Context from "../Context.jsx";
import VideoPlayer from "../components/VideoPlayer.jsx";
import {useNavigate} from "react-router-dom";

const MainPage = observer(() => {
    const {records} = useContext(Context)

    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const handleOpen = () => setIsPlayerOpen(true);
    const handleClose = () => setIsPlayerOpen(false);

    const [videoJsOptions, setVideoJsOptions] = useState(null)

    useEffect(() => {
        fetchRecords()
            .then(data => records.setRecords(data))
            .catch(e => alert(e))

        fetchChannels()
            .then(data => {
                console.log(data);
                records.setChannels(data)
            })
            .catch(e => alert(e))

    })
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    }}>
        <RecordList setVideoJsOptions={setVideoJsOptions} handleOpen={handleOpen}/>
        <FollowList/>
        <VideoPlayer isPlayerOpen={isPlayerOpen} videoJsOptions={videoJsOptions} handleOpen={handleOpen}
                     handleClose={handleClose}></VideoPlayer>
    </div>

})

export default MainPage;
