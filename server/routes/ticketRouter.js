const Router = require('express');
const router = new Router();
const ticketController = require('../controllers/ticketController');

router.post('/check/:token', ticketController.check);

module.exports = router;