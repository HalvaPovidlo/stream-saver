import React, {useContext, useState} from 'react';
import Context from "../Context";
import {observer} from "mobx-react-lite";
import {fetchActiveFollows, followChannel, unfollowChannel} from "../http/recordAPI";
import {Button,  List, ListItem, TextField} from "@mui/material";

const FollowList = observer(() => {
    // @ts-expect-error TS(2339): Property 'records' does not exist on type 'null'.
    const {records} = useContext(Context)
    const activeFollows = records.activeFollows

    const [channelToFollow, setChannelToFollow] = useState('')

    const [errorOccurred, setErrorOccurred] = useState(false);
    const [errorText, setErrorText] = useState('');// todo: diff errors handling (validation and alerts)
    return (
        <List className = 'follow-list'>
            {activeFollows.map((c: any) => <ListItem key={c.id}>{c.name}
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
                        // @ts-expect-error TS(2571): Object is of type 'unknown'.
                        setErrorText(e.response.data.message)
                        // @ts-expect-error TS(2571): Object is of type 'unknown'.
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