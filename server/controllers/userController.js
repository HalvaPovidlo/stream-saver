const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Follow} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Invalid email or password'))
        }

        try {
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('User with this email already exists'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, role, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.role)

            return res.json({token})
        } catch (error) {
             console.error('Registration error', error);
            return next(ApiError.internal(`An error occurred while trying to register: ${error.message}`));
        }

    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.badRequest('User not found'))
            }

            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.unauthorized('Incorrect password'))
            }

            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})

        } catch (error) {
            console.error('Login error', error);
            return next(ApiError.internal(`An error occurred while trying to login: ${error.message}`));
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }


    async getLoadedVideos(req, res, next) {
        try {
            const userId = req.user.id;
            const user = await User.findByPk(userId);

            const videos = await user.getVideos();
            return res.status(200).json(videos);
        } catch (error) {
            console.error('Error while fetching video data:', error);
            return next(ApiError.internal(`An error occurred while fetching video data: ${error.message}`));
        }
    }

    async getFollowedChannels(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id);

            const channels = await user.getChannels();

            return res.json(channels);
        } catch (error) {
            console.error('An error occurred while fetching followed channels:', error);
            return next(ApiError.internal(error.message))
        }
    }

    async getUserFollows(req, res, next) {
        try {
            let follows = await Follow.findAll({where: {userId: req.user.id}})
            return res.json(follows)
        } catch (error) {
            console.error("An error occurred while fetching follows", error);
            return next(ApiError.internal(`An error occurred fetching follow:${error.message}`));
        }
    }

}

module.exports = new UserController()