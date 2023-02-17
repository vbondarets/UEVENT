const ApiError = require("../helpers/error/ApiError");
const sportEventService = require("../services/sportEventApi")

class EventController {
    async getAll(req, res, next) {
        try {
            sportEventService.getAll().then(resolve => {
                if(resolve.length > 0){
                    return res.json(resolve)
                }
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            });
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new EventController();