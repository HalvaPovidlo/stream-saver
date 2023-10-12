const {exec} = require('child_process');
const {resolve} = require("path");
const {Video, User, Follow, Channel} = require("../models/models");

const pythonScript = 'twitchApi/downloadStream.py';
const loadStreamPreviewImage = require('./loadStreamPreview')
const fs = require("fs");
const path = require('path')

async function handleLoadFinish(channelName, videoFilePath, channelId, streamTitle, previewImageResponse) {
    try {
        videoFilePath = videoFilePath.slice(0, -2)//removing excess symbols

        let previewDirectoryPath = path.join(videoFilePath, "..", "..", "..", "previews", channelName)
        if (!fs.existsSync(previewDirectoryPath)) {
            fs.mkdirSync(previewDirectoryPath, {recursive: true});
        }
        let previewFilePath = path.join(previewDirectoryPath, path.basename(videoFilePath).replace('.mp4', '.jpg'))

        let video = await Video.create({
            channelId: channelId,
            path: videoFilePath,
            name: streamTitle,
            previewPath: previewFilePath,
        })


        previewImageResponse.data.pipe(fs.createWriteStream(previewFilePath));

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

async function startStreamLoading(channelName, channelId, streamTitle, streamThumbnailUrl) {
    let previewImageResponse = ''
    try {
        previewImageResponse = await loadStreamPreviewImage(streamThumbnailUrl);
    } catch (e) {
        console.log(`An error while trying to load the preview image occurred ${e.message}`);
        throw ApiError.internal(`An error while trying to load the preview image occurred ${e.message}`)
    }
    exec(`python ${pythonScript} https://www.twitch.tv/${channelName}`, (error, stdout, stderr) => {
        if (!error) {
            console.log(`Python-script execution results:\n${stdout}`)
            handleLoadFinish(channelName, stdout, channelId, streamTitle, previewImageResponse)
        } else {
            console.error(`Python-script execution error: ${error}`);
            return;
        }
    });
}

module.exports = startStreamLoading