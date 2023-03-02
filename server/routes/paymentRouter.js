const Router = require('express');
const router = new Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.createPayment);
router.post('/', paymentController.checkPayment);

module.exports = router;