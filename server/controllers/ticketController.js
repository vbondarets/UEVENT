const ApiError = require("../helpers/error/ApiError");
const secureConfig = require('../secureConfig.json');
const jwt = require('jsonwebtoken');
const { TicketModel } = require("../models/ticketModel");

class ticketController {
    
    async getAllUsers(req, res, next) {
        try {
            const {event_Id} = req.params
            TicketModel.findAll( 
                {where: {
                    event_id:event_Id
                }}).then( resp => {
                if (resp.length > 0) {
                    return res.json(resp)
                }
                else {
                    return next(ApiError.internal("No users"));
                }
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown' + error))
        }
    }

	async getAllOfUser(req, res, next) {
        try {
            const {user_id} = req.params
            TicketModel.findAll( 
                {where: {
                    user_id:user_id
                }}).then( resp => {
                if (resp.length > 0) {
                    return res.json(resp)
                }
                else {
                    return next(ApiError.internal("No tickets"));
                }
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown' + error))
        }
    }

    async check(req, res, next) {
        try {
            const {token} = req.params;
            // console.log(token);
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
            // console.log(error);
            // if(error.message === "JsonWebTokenError: invalid signature"){
            //     return next(ApiError.forbiden('Acces deny'));
            // }
            // return next(ApiError.internal('Unknown error: ' + error));
            return next(ApiError.forbiden('Acces deny: ' + error));
        }
    }
}

module.exports = new ticketController();