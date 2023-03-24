const ApiError = require("../helpers/error/ApiError");
const { CommentModel } = require("../models/commentsModel");


class CommentController {
    async getAllComments (req, res, next) {
        try {
            CommentModel.findAll().then( resolve => {
                if (resolve.length >0) {
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }

    async getCommentsByEvent_id ( req, res, next ) {
        try {
            const {event_id} = req.params
            CommentModel.findAll( {
                where: {
                    event_id: event_id
                }
            }).then (resolve => {
                if (resolve.length > 0) {
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error))
        }
    } 

    async createComment (req, res, next) {
        try {
            const {comment, event_id, user_id} = req.body
            CommentModel.create ({
                comment, event_id, user_id
            }).then ( () => {
                return res.json("Comment created!")
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error))
        }
    }
}

module.exports = new CommentController()