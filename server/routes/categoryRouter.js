const Router = require('express');
const router = new Router();
const categroryController = require('../controllers/categoryController');

router.get('/', categroryController.getAll);
router.post('/', categroryController.create);
router.get('/:id', categroryController.getById);
router.patch('/:id', categroryController.update);
router.delete('/:id', categroryController.delete);
module.exports = router;