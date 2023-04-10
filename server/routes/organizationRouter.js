const Router = require('express');
const router = new Router();
const organizationController = require('../controllers/organizationController');

router.get('/', organizationController.getAll);
router.post('/', organizationController.create);
router.get('/:id', organizationController.getById);
router.get('/author/:id', organizationController.getByCreator);
router.patch('/:id', organizationController.update);
router.delete('/:id', organizationController.delete);
router.get('/:id/post', organizationController.getByOrganization);
router.post('/post', organizationController.createPost);
router.patch('/post', organizationController.updatePost);
router.delete('/post/:id', organizationController.deletePost);


module.exports = router;