const Router = require('express');
const router = new Router();
const ticketController = require('../controllers/ticketController');

router.post('/check/:token', ticketController.check);
router.get('/list/:event_Id', ticketController.getAllUsers)
router.get('/userlist/:user_id', ticketController.getAllOfUser)

module.exports = router;