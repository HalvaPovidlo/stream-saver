const axios = require("axios");
const fs = require("fs");
const path = require('path')


module.exports = async function loadStreamPreviewImage(streamThumbnailUrl, width = 854, height = 480) {
    streamThumbnailUrl = streamThumbnailUrl.replace("{width}x{height}", `${width}x${height}`);
    try {
        return await axios({
            method: 'get',
            url: streamThumbnailUrl,
            responseType: 'stream',
        });
    } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
    }
}