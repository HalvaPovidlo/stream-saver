const Router = require("express")
const router = new Router();

const followRouter = require("./followRouter")
const userRouter = require("./userRouter")
const videoRouter = require("./videoRouter")

router.use("/user", userRouter)
router.use("/follow", followRouter)
router.use("/video", videoRouter)

module.exports = router;