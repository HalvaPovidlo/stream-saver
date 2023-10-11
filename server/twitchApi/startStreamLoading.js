const {exec} = require('child_process');
const {resolve} = require("path");
const {Video, User, Follow, Channel} = require("../models/models");

const pythonScript = 'twitchApi/downloadStream.py';


async function handleLoadFinish(stdout, channelId, streamTitle) {
    try {
        let p = stdout.split(/[\\/]/)//chatgpt
        let name = p[p.length - 1]
        let video = await Video.create({
            channelId: channelId,
            path: stdout,
            name: streamTitle,
        })

        const users = await User.findAll({
            include: {
                model: Channel,
                where: {id: channelId},
            },
        });
        video.addUsers(users)
        console.log("video created")
    } catch (error) {
        console.log(error)
    }
}

async function startStreamLoading(channelName, channelId, streamTitle) {
    exec(`python ${pythonScript} https://www.twitch.tv/${channelName}`, (error, stdout, stderr) => {
        if (!error) {
            console.log(`Python-script execution results:\n${stdout}`)
            handleLoadFinish(stdout, channelId, streamTitle)
        } else {
            console.error(`Python-script execution error: ${error}`);
            return;
        }
    });
}

module.exports = startStreamLoading