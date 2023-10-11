const {Follow, Video, User} = require("../models/models");
const {Op} = require("sequelize");
const {resolve} = require("path");
const path = require("path");
const ApiError = require("../error/ApiError");

class VideoController {
    async getFile(req, res,next) {
        try {
            const videoId = req.params.id
            const userId = req.user.id

            const user = await User.findByPk(userId);
            const video = await Video.findByPk(videoId);

            if (video === null) {
                return next(ApiError.badRequest(console.log("Video not found")))
            }


            const hasAccess = await user.hasVideo(video);

            if (hasAccess) {
                let a = video.path.slice(0, -2)
                res.headers
                return res.sendFile(video.path.slice(0, -2));
            } else return next(ApiError.forbidden('Access denied'))
        } catch (error) {
            next(ApiError.internal(error.message))
        }
    }


}

module.exports = new VideoController()