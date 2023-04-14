const Router = require('express');
const router = new Router();
const ticketController = require('../controllers/ticketController');

router.get('/check/:token', ticketController.check);
router.get('/list/:event_Id', ticketController.getAllUsers)

module.exports = router;