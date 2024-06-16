import {$authHost} from "./index";



export const fetchRecords = async () => {
    const {data} = await $authHost.get('api/user/videos')
    return data
}
export const fetchActiveFollows = async () => {
    const {data} = await $authHost.get('api/user/channels')
    return data
}

export const followChannel = async(channelName: string, channelPlatform: string)=>{
    const {data} = await $authHost.post('api/follow',{channelName,channelPlatform})
    return data;
}

export const unfollowChannel = async (channelId: number) => {
    const {data} = await $authHost.delete(`api/follow?channelId=${channelId}`)
    return data;
}