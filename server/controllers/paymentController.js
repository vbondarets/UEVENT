const ApiError = require("../helpers/error/ApiError");
const paymentService = require("../services/fondyPaymentAPI");
const secureConfig = require('../secureConfig.json');
const jwt = require('jsonwebtoken');
const PdfGenerator = require('../helpers/PdfGenerator/PdfGenerator');
const fileMailingService = require("../services/fileMailingService");
const fs = require("fs");

class PaymentController {
    async createPayment(req, res, next) {
        try {
            const {order_id, order_desc, amount, currency, merchant_data} = req.body;
            const result = await paymentService(order_id, order_desc, amount, currency, merchant_data);
            return res.json(result)

        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async checkPayment(req, res, next) {
        try {
            const {merchant_data, response_status, currency, amount, masked_card} = req.body;
            if(response_status === "success"){
                const decoded = jwt.verify(merchant_data.seqToken, secureConfig.SECRET_KEY);
                if(decoded){
                    const path = await PdfGenerator(merchant_data.seqToken);
                    await fileMailingService('bondaretsdirect@gmail.com', path);
                    return res.json(decoded)
                }
            }
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new PaymentController();