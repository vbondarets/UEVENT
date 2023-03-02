const ApiError = require("../helpers/error/ApiError");

class PaymentController {
    async createPayment(req, res, next) {
        try {
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async checkPayment(req, res, next) {
        try {
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new PaymentController();