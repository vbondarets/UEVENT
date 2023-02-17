const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
// const userRouter = require('./userRouter');
const eventRouter = require('./eventRouter')

router.use('/auth', authRouter);
// router.use('/user', userRouter);
router.use('/event', eventRouter)

module.exports = router;