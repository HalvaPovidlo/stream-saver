const {Follow, Channel, User} = require('../models/models')
const {DataTypes} = require("sequelize");
const fetchTwitchChannelInfo = require("../twitchApi/fetchTwitchChannelInfo")
const ApiError = require("../error/ApiError");

class FollowController {
    async create(req, res, next) {
        try {
            const {channelName, channelPlatform} = req.body;

            if (channelPlatform === "twitch") {
                const channelInfo = await fetchTwitchChannelInfo(channelName, req.app.get('token'))
            }

            let channel = await Channel.findOrCreate({where: {name: channelName, platform: channelPlatform}})

            let follow = await Follow.create({
                channelId: channel[0].dataValues.id,
                userId: req.user.id,
            })

            await Channel.update(
                {isCurrentlyFollowed: true},
                {where: {name: channelName, platform: channelPlatform}}
            )

            return res.status(201).json("followed successfully")
        } catch (error) {
            console.error(`Error creating follow: ${error}`);
            if(error instanceof ApiError) next(error)
            else next(ApiError.internal(500, `Error creating follow: ${error.message}`));
        }
    }


    async unsubscribeUserFromChannel(req, res, next) {

        const userId = req.user.id;
        const channelId = req.query.channelId;

        try {

            const user = await User.findByPk(userId);
            const channel = await Channel.findByPk(channelId);

            if (!channel) {
                return next(ApiError.badRequest("Channel not found"))
            }

            await user.removeChannel(channel);
            const subscriptionsCount = await Follow.count({
                where: {channelId},
            });
            if (subscriptionsCount === 0) await channel.update({isCurrentlyFollowed: false});
            return res.status(204).json({message: "Unsubscribed successfully"});
        } catch (error) {
            console.error("An error occurred while unsubscribing.", error);
            return next(ApiError.internal(`An error occurred while unsubscribing:${error.message}`));
        }
    }
}

module.exports = new FollowController()