const Router = require('express');
const commentController = require('../controllers/commentController');
const router = new Router();

router.get('/',commentController.getAllComments)
router.get('/event/:event_id', commentController.getCommentsByEvent_id)

router.post('/', commentController.createComment)

module.exports = router