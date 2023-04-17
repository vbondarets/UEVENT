const Router = require('express');
const router = new Router();
const ticketController = require('../controllers/ticketController');

router.get('/check/:token', ticketController.check);
router.get('/list/:event_Id', ticketController.getAllUsers)
router.get('/userlist/:user_id', ticketController.getAllOfUser)
router.get('/dowload/:id', ticketController.downloadById)

module.exports = router;