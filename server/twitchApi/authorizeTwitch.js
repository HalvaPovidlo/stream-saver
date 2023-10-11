const axios = require("axios");
const ApiError = require("../error/ApiError");

async function authorizeTwitch() {
    try {
        const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
        let response = await axios.post(authUrl)
        return response.data.access_token
    } catch (error) {
        console.log("Unable to get Twitch authorization token")
        return error
    }

}


/*async function authorizeTwitch() {

    const authUrl = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;
    let accessToken = ""
    await axios.post(authUrl)
        .then((response) => {
            accessToken = response.data.access_token;
        })
        .catch((error) => {
            console.error(`Не удалось получить токен доступа. Ошибка: ${error}`);
        });
    return accessToken
}**/

module.exports = authorizeTwitch;