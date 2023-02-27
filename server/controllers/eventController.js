const ApiError = require("../helpers/error/ApiError");
const {EventModel} = require('../models/eventModel');
const eventListing = require('../helpers/eventListing');
const {TicketModel} = require('../models/ticketModel');

class EventController {
    async getAll(req, res, next) {
        try {
            eventListing();
            EventModel.findAll().then(resolve => {
                if(resolve.length > 0){
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async create(req, res, next) {
        try {
            // const {} = 
            EventModel.findAll().then(resolve => {
                if(resolve.length > 0){
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async getByCategory(){
        
    }
}

module.exports = new EventController();