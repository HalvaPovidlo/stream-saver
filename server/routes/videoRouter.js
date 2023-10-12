const Router = require("express")
const router = new Router();
const videoController = require('../controllers/videoController')
const auth = require("../middleware/AuthMiddleware")



router.get('/:id/file/',auth,videoController.getFile)
router.get('/:id/previewImage',auth,videoController.getPreviewImage)

module.exports = router;