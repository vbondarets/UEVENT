const ApiError = require("../helpers/error/ApiError");
const paymentService = require("../services/fondyPaymentAPI");
const secureConfig = require('../secureConfig.json');
const jwt = require('jsonwebtoken');
const PdfGenerator = require('../helpers/PdfGenerator/PdfGenerator');
const fileMailingService = require("../services/fileMailingService");
const fs = require("fs");
const { UserModel } = require("../models/userModel");
const { TicketModel } = require("../models/ticketModel");

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
                    const path = await PdfGenerator(merchant_data.seqToken, decoded);
                    const User = await UserModel.findAll({
                        where: {
                            user_id: merchant_data.user_id
                        }
                    });
                    await fileMailingService(User[0].email, path);
                    TicketModel.create({
                        price: decoded.amount / 100, 
                        path: path,
                        user_id: User[0].user_id,
                        event_id: merchant_data.event_id
                    }).then(() => {
                        return res.json({decoded, merchant_data, User});
                    }).catch((error) => {
                        console.log(error);
                        return next(ApiError.internal('Unknown error: ' + error));
                    })
                }
            }
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new PaymentController();