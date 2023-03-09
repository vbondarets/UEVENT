const ApiError = require("../helpers/error/ApiError");
const {EventModel, EventCategoryModel, EventSubModel} = require('../models/eventModel');
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
            const {name, startDateTime, endDateTime, tickets_count, region, imgLink} = req.body;
            EventModel.create({
                name, startDateTime, endDateTime, tickets_count, region, imgLink
            }).then(() => {
                return res.json("Event created");
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async getByCategory(){
        try {
            const {categoryId} = req.body;
            EventCategoryModel.findAll({
                attributes: ['event_id'],
                where: {
                    category_id: categoryId
                }
            }).then(resolve => {
                let event_array = [];
                resolve.forEach(element => {
                    EventModel.findAll({
                        where: {event_id: element.event_id}
                    }).then(result => {
                        event_array.push(result);
                    })
                });
                if(event_array.length > 0){
                    return res.json(event_array);
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    async createEventSub(req, res, next) {
        try {
            const {eventID, userId} = req.body;
            EventSubModel.create({
                eventID, userId
            }).then(() => {
                return res.json("Event sub created");
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
}

module.exports = new EventController();