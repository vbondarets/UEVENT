const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
// const userRouter = require('./userRouter');
const eventRouter = require('./eventRouter');
const paymentRouter = require('./paymentRouter');
const ticketRouter = require('./ticketRouter');
const organizationRouter = require('./organizationRouter');
const categoryRouter = require('./categoryRouter');
const commentRouter = require ('./commentRouter')

router.use('/auth', authRouter);
// router.use('/user', userRouter);
router.use('/event', eventRouter);
router.use('/payment', paymentRouter);
router.use('/ticket', ticketRouter);
router.use('/organization', organizationRouter);
router.use('/category', categoryRouter);
router.use('/comment', commentRouter)

module.exports = router;