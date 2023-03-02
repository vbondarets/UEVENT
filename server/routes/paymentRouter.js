const Router = require('express');
const router = new Router();
const paymentController = require('../controllers/paymentController');

router.post('/create', paymentController.createPayment);
router.post('/check', paymentController.checkPayment);

module.exports = router;