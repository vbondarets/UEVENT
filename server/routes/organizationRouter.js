const Router = require('express');
const router = new Router();
const organizationController = require('../controllers/organizationController');

router.get('/', organizationController.getAll);
router.post('/', organizationController.create);
router.get('/:id', organizationController.getById);
router.get('/author/:id', organizationController.getById);
router.patch('/:id', organizationController.update);
router.delete('/:id', organizationController.delete);
module.exports = router;