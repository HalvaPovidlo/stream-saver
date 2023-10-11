const Router = require("express")
const router = new Router();
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/check', authMiddleware, userController.check)

router.get('/videos', authMiddleware, userController.getLoadedVideos)
router.get('/channels', authMiddleware, userController.getFollowedChannels)
router.get('/follows', authMiddleware, userController.getUserFollows)

module.exports = router;