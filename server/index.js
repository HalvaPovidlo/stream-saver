require("dotenv").config();
const express = require('express')
const sequelize = require("./db")
const PORT = process.env.PORT || 5000
const cors = require("cors")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const authTwitch = require("./twitchApi/authorizeTwitch")
const fetchTwitchChannelInfo = require("./twitchApi/fetchTwitchChannelInfo")
const app = express()
const startStreamLoading = require("./twitchApi/startStreamLoading")
const {Channel} = require("./models/models");


app.use(cors())

app.use(express.json())
//app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)


app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.set('token', await authTwitch())

        let downloadStarted = false
        let downloadingChannels = []
        //проверить поведеение при повторном включении стрима
        setInterval(async () => {
            console.log("now:", new Date())
            console.log("loading:", downloadingChannels)

            let channels = await Channel.findAll({where: {isCurrentlyFollowed: true}})

            for (const channel of channels) {
                const name = channel.dataValues.name;
                const channelInfo = await fetchTwitchChannelInfo(name, app.get("token"))
                const streamInfo = channelInfo[0]
                if (streamInfo && streamInfo.type === 'live' && !downloadingChannels.includes(name)) {
                    await startStreamLoading(name, channel.dataValues.id, streamInfo.title);
                    downloadingChannels.push(name);
                } else if (!streamInfo && downloadingChannels.includes(name)) {
                    const index = downloadingChannels.indexOf(name)
                    downloadingChannels.splice(index, 1);
                }
            }
        }, 5000)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.error(error)
    }
}
start()

