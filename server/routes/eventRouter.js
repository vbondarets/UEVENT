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

=======
>>>>>>> 3cf3d977c9cee37cbdf81cf36691901942c6c07d
module.exports = router;