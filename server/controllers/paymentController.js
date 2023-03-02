const ApiError = require("../helpers/error/ApiError");
const paymentService = require("../services/fondyPaymentAPI");

class PaymentController {
    async createPayment(req, res, next) {
        try {
            const {order_id, order_desc, amount, currency} = req.body;
            const result = await paymentService(order_id, order_desc, amount, currency);
            return res.json(result)

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