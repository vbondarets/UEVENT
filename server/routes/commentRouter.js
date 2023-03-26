const Router = require('express');
const commentController = require('../controllers/commentController');
const router = new Router();

router.get('/',commentController.getAllComments)
router.get('/event/:event_id', commentController.getCommentsByEvent_id)

router.post('/', commentController.createComment)

router.delete('/delete/:comment_id/user/:user_id', commentController.deleteComment)

module.exports = router