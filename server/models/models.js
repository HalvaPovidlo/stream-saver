const sequelize = require("../db")
const {DataTypes} = require("sequelize")

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})


const Follow = sequelize.define('follow', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


const Channel = sequelize.define('channel', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    isCurrentlyFollowed: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    platform: {type: DataTypes.STRING, allowNull: false}
})


const Video = sequelize.define('video', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false},
    path: {type: DataTypes.STRING, allowNull: false},
    previewPath: {type: DataTypes.STRING, allowNull: true},
})


const UserVideo = sequelize.define('user_video', {
      id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.belongsToMany(Channel, { through: Follow });
Channel.belongsToMany(User, { through: Follow });

Video.belongsTo(Channel)
Channel.hasMany(Video)

User.belongsToMany(Video, { through: UserVideo });
Video.belongsToMany(User, { through: UserVideo });

module.exports =
    {
        User,
        Follow,
        Channel,
        Video
    }