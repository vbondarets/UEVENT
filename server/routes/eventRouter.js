const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAll);
router.post('/', eventController.create);
router.get('/:id', eventController.getEventById)
module.exports = router;