const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAll);
router.post('/', eventController.create);
router.get('/allcategories', eventController.getAllCategories)
router.get("/categories/:category_id",eventController.getByCategory);
router.get('/:id', eventController.getEventById);
module.exports = router;