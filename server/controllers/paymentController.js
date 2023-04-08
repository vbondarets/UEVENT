const ApiError = require("../helpers/error/ApiError");
const paymentService = require("../services/fondyPaymentAPI");
const secureConfig = require('../secureConfig.json');
const jwt = require('jsonwebtoken');
const PdfGenerator = require('../helpers/PdfGenerator/PdfGenerator');
const fileMailingService = require("../services/fileMailingService");
const fs = require("fs");
const { UserModel } = require("../models/userModel");
const { TicketModel, PromoModel } = require("../models/ticketModel");
const { EventModel } = require("../models/eventModel");

class PaymentController {
    async createPayment(req, res, next) {
        try {
            const {order_id, order_desc, currency, merchant_data, promoCode} = req.body;
            let {amount} = req.body;
            if(promoCode){
                PromoModel.findAll({
                    where: {
                        promo_code: promoCode
                    }
                }).then((promo) => {
                    if(promo.count > 0){
                        amount = amount - (amount / 100 * promo.discount);
                        PromoModel.update(
                            {
                                count: promo.count - 1 
                            },
                            {
                                where: {
                                    promo_id: promo.promo_id
                                }
                            }
                        )
                    }
                }).catch((error) => {
                    console.log('Wrong promo-code')
                })
            }
            const result = await paymentService(order_id, order_desc, amount, currency, merchant_data);
            return res.json(result);
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
                    const User = await UserModel.findAll({
                        where: {
                            user_id: merchant_data.user_id
                        }
                    });
                    const Event = await EventModel.findAll({
                        where: {
                            event_id: merchant_data.event_id
                        }
                    });
                    if(Event[0].tickets_count > 0){
                        const path = await PdfGenerator(merchant_data.seqToken, Event[0], User[0]);
                        await fileMailingService(User[0].email, path);
                        EventModel.update(
                            {
                                tickets_count: Event[0].tickets_count - 1
                            },
                            {
                                where: {
                                    event_id: Event[0].event_id
                                }
                            }
                        ).then(() => {
                            TicketModel.create({
                                price: decoded.amount / 100, 
                                path: path,
                                user_id: User[0].user_id,
                                event_id: merchant_data.event_id
                            }).then((result) => {
                                return res.json(result);
                            }).catch((error) => {
                                console.log(error);
                                return next(ApiError.internal('Unknown error: ' + error));
                            })
                        }).catch(error => {
                            return next(ApiError.internal('Unknown error: ' + error));
                        });
                    }
                    else{
                        return next(ApiError.conflict("No more tickets"));
                    }
                }
            }
            
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new PaymentController();