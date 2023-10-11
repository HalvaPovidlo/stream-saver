const Router = require("express")
const router = new Router();
const videoController = require('../controllers/videoController')
const auth = require("../middleware/AuthMiddleware")



router.get('/file/:id',auth,videoController.getFile)

module.exports = router;