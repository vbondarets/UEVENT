const ApiError = require("../helpers/error/ApiError");
const {EventModel, EventCategoryModel, EventSubModel} = require('../models/eventModel');
const eventListing = require('../helpers/eventListing');
const {TicketModel} = require('../models/ticketModel');

class EventController {
    async getAll(req, res, next) {
        try {
            EventModel.findAll().then(resolve => {
                if(resolve.length > 0){
                    return res.json(resolve)
                }
                else {
                    return res.json('No events yet')
                }
            }).catch(error => {
                return next(ApiError.internal('Unknown error: ' + error));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }

    async getEventById(req, res, next) {
        try {
            const {id} = req.params
            EventModel.findAll({where:{
                event_id: id
            }}).then(resolve => {
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
            const {name, startDateTime, endDateTime, tickets_count, region, imgLink, category_id, price} = req.body;
            EventModel.create({
                name, startDateTime, endDateTime, tickets_count, price, region, imgLink, category_id, 
            }).then(() => {
                return res.json("Event created");
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    
    async getAllCategories (req, res, next) {
        try {
            EventCategoryModel.findAll().then(resolve => {
                if (resolve.length > 0) {
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }

    async getByCategory(req, res, next){
        try {
            const {category_id} = req.params;
            EventModel.findAll ({
                where:{
                    category_id: category_id
                }
            }).then(resolve => {
                if (resolve.length > 0) {
                    return res.json(resolve)
                }
                else {
                    return res.json("No events in this category")
                }
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