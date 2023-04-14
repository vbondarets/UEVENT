const Router = require('express');
const router = new Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAll);
router.get('/org/:organizationId', eventController.getByOrg);
router.get('/allcategories', eventController.getAllCategories)
router.get("/categories/:category_id",eventController.getByCategory);
router.get('/event/:id', eventController.getEventById);
router.get('/types', eventController.getAllTypes)
router.get('/sort/:category_id/:type_id', eventController.sortEventByTypeCategory)
router.get(`/subscribe/:event_id`, eventController.getAllSubscriptionOnEvent)

router.post('/', eventController.create);
router.post('/subscripe/:event_id', eventController.SubscripeOnEvent)
router.delete(`/subscripe/:event_id/user/:user_id`, eventController.DeleteSubs)
router.delete('/delete/:event_id', eventController.DeleteEvent)

module.exports = router;