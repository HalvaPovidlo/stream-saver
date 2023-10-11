const Router = require("express")
const router = new Router();
const followController = require('../controllers/followController')
const authMiddleware = require("../middleware/AuthMiddleware");

router.post('/', authMiddleware,followController.create)
router.delete('/',authMiddleware,followController.unsubscribeUserFromChannel)


module.exports = router;