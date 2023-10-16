const axios = require('axios')
const ApiError = require("../error/ApiError");
const req = require("express/lib/request");
//returns undefined if channel not exists
//returns [] if it is offline
async function fetchTwitchChannelInfo(channelName, accessToken) {
    try {
        const url = `https://api.twitch.tv/helix/streams?user_login=${channelName}`;

        const headers = {
            'Client-ID': process.env.TWITCH_CLIENT_ID, // Замените на ваш Client ID
            'Authorization': `Bearer ${accessToken}`
        };

        let response = await axios.get(url, {headers})
        return response.data.data;

    } catch (error) {
        console.error(`Error fetching Twitch channel info: ${error}`);
        if (error.response.data.status === 400) {
            throw ApiError.badRequest(error)
        } else throw ApiError.internal('Unexpected error')
    }
}


module.exports = fetchTwitchChannelInfo
