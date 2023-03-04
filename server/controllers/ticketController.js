const ApiError = require("../helpers/error/ApiError");
const secureConfig = require('../secureConfig.json');
const jwt = require('jsonwebtoken');

class ticketController {
    
    async check(req, res, next) {
        try {
            const {token} = req.params;
            if(token){
                const decoded = jwt.verify(token, secureConfig.SECRET_KEY);
                if(decoded){
                    return res.json({
                        message: "ticket legit",
                        data: decoded
                    })
                }
                else {
                    return next(ApiError.forbiden('Acces deny'));
                }
            }
            else {
                return next(ApiError.badRequest('Token not found'));
            }
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new ticketController();