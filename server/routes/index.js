const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
// const userRouter = require('./userRouter');
const eventRouter = require('./eventRouter');
const paymentRouter = require('./paymentRouter');

router.use('/auth', authRouter);
// router.use('/user', userRouter);
router.use('/event', eventRouter);
router.use('/payment', paymentRouter);


module.exports = router;