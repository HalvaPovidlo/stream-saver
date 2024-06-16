import React, {useContext, useState} from "react";
import Context from "../Context";
import {observer} from "mobx-react-lite";
import {
    fetchActiveFollows,
    followChannel,
    unfollowChannel,
} from "../http/recordAPI";
import {Button, List, ListItem, TextField} from "@mui/material";
import {AxiosError} from "axios";

const FollowList = observer(() => {
    const {recordStore} = useContext(Context);
    const activeFollows = recordStore.activeFollows;

    const [channelToFollow, setChannelToFollow] = useState<string>("");
    const [errorOccurred, setErrorOccurred] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>(""); // todo: diff errors handling (validation and alerts)

    return (
        <List className="follow-list">
            {activeFollows.map((c) => (
                <ListItem key={c.id}>
                    {c.name}
                    <Button
                        onClick={async () => {
                            try {
                                await unfollowChannel(c.id);
                                fetchActiveFollows().then((data) => {
                                    recordStore.setActiveFollows(data);
                                });
                            } catch (e) {
                                alert(e);
                            }
                        }}
                    >
                        {" "}
                        unfollow
                    </Button>
                </ListItem>
            ))}
            <ListItem>
                <TextField
                    type="text"
                    error={errorOccurred}
                    helperText={errorText}
                    value={channelToFollow}
                    onChange={(e) => {
                        setChannelToFollow(e.target.value);
                    }}
                />
                <Button
                    color="success"
                    onClick={async () => {
                        try {
                            await followChannel(channelToFollow, "twitch");
                            const channels = await fetchActiveFollows();

                            setErrorOccurred(false);
                            setErrorText("");
                            recordStore.setActiveFollows(channels);
                        } catch (e) {
                            setErrorOccurred(true);
                            if (e instanceof AxiosError) setErrorText("Failed following. Error:" + e.response?.statusText)
                            else throw e;
                        }
                    }}
                >
                    Add follow
                </Button>
            </ListItem>
        </List>
    );
});

export default FollowList;
