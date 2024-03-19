import React, {useContext, useState} from 'react';
import Context from "../Context.jsx";
import {observer} from "mobx-react-lite";
import {fetchActiveFollows, followChannel, unfollowChannel} from "../http/recordAPI.jsx";
import {Button,  List, ListItem, TextField} from "@mui/material";

const FollowList = observer(() => {
    const {records} = useContext(Context)
    const activeFollows = records.activeFollows

    const [channelToFollow, setChannelToFollow] = useState('')

    const [errorOccurred, setErrorOccurred] = useState(false);
    const [errorText, setErrorText] = useState('');// todo: diff errors handling (validation and alerts)
    return (
        <List className = 'follow-list'>
            {activeFollows.map(c => <ListItem key={c.id}>{c.name}
                <Button onClick={async () => {
                    try {
                        await unfollowChannel(c.id)
                        fetchActiveFollows().then(data => {
                            records.setActiveFollows(data)
                        })
                    } catch (e) {
                        alert(e)
                    }
                }}> unfollow
                </Button>

            </ListItem>)}
            <ListItem>
                <TextField type="text" error={errorOccurred} helperText={errorText} value={channelToFollow}
                           onChange={(e) => {
                               setChannelToFollow(e.target.value)
                           }}/>
                <Button color="success" onClick={async () => {
                    try {
                        await followChannel(channelToFollow, 'twitch')

                        const channels = await fetchActiveFollows()

                        setErrorOccurred(false)
                        setErrorText("")
                        records.setActiveFollows(channels)
                    } catch (e) {
                        setErrorOccurred(true)
                        setErrorText(e.response.data.message)
                        console.log(e.response.data.message)
                    }
                }
                }>Add follow
                </Button>
            </ListItem>
        </List>
    );
})

export default FollowList;