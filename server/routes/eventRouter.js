const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAll);
router.get('/allcategories', eventController.getAllCategories)
router.get("/categories/:category_id",eventController.getByCategory);
router.get('/event/:id', eventController.getEventById);
router.get('/types', eventController.getAllTypes)
router.get('/sort/:category_id/:type_id', eventController.sortEventByTypeCategory)

router.post('/', eventController.create);
<<<<<<< HEAD
router.get('/:id', eventController.getEventById);
=======

>>>>>>> 8c49442170688bf58b33ff105c44f9e3e7cf70db
module.exports = router;