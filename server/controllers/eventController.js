const ApiError = require("../helpers/error/ApiError");
const {EventModel, EventCategoryModel, EventTypeModel, EventSubModel} = require('../models/eventModel');
const eventListing = require('../helpers/eventListing');
const {TicketModel} = require('../models/ticketModel');
const { json } = require("body-parser");
const { Op } = require("sequelize");
const uuid = require('uuid');
const path = require('path');

class EventController {
    async getAll(req, res, next) {
        try {
            //await eventListing();
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

            const {name, startDateTime, endDateTime, tickets_count, region, category_id, price, description, type_id, organization_id} = req.body;
            // console.log(type_id);
            const {img} = req.files;
            const fileName = uuid.v4()+ ".jpg";
            img.mv(path.resolve(__dirname, "..", "static", fileName));
            EventModel.create({
                name, startDateTime, endDateTime, tickets_count, price, region, imgLink: fileName, category_id, description,type_id,organization_id
            }).then(() => {
                return res.json("Event created");
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }
    
    async SubscripeOnEvent (req, res, next) {
        try {
            const {event_id} = req.params
            const {user_id} = req.body
            console.log(user_id);
            EventSubModel.create ( {
                event_id, user_id
            }).then( () => {
                return res.json('You subscripe on event')
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error))
        }
    }

    async DeleteSubs(req, res, next) {
        try {
            const {event_id} = req.params
            const {user_id} = req.params
            EventSubModel.destroy ( {
                where: {
                    event_id: event_id,
                    user_id: user_id
                }
            }).then( () => {
                return res.json('You dissubscribe on event')
            }).catch(err => {
                return next(ApiError.internal('Unknown error: ' + err));
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error))
        }
    }

    async getAllSubscriptionOnEvent (req, res, next) {
        try {
            const {event_id} = req.params
            EventSubModel.findAll({where: {event_id: event_id}}).then (resolve => {
                if (resolve.length > 0 ) {
                    return res.json(resolve)
                }
                else {
                    return next(ApiError.badRequest('Not Found'));
                }
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error))
        }
    }

    async getAllTypes (req, res, next) {
        try {
            EventTypeModel.findAll({
                attributes: { exclude: ['eventEventId'] }
            }).then( resolve => {
                if (resolve.length > 0) {
                    return res.json(resolve)
                }
                else {
                    return res.json("No types yet")
                }
            })
        } catch (error) {
            return next(ApiError.internal('Unknown error: ' + error));
        }
    }

    async sortEventByTypeCategory (req, res, next) {
        try {
            const {category_id, type_id} = req.params
            console.log(category_id);
            console.log(type_id);
            if (type_id != "undefined" && category_id != "undefined") {
                console.log("hyu");
                EventModel.findAll ( {
                    where: {
                        category_id: category_id,
                        type_id:type_id
                    }
                }).then ( result => {
                    return res.json(result)
                })         
            }
            else {
                console.log("hyu1");
                if(type_id === "undefined") {
                    EventModel.findAll( {
                        where: {
                            category_id: category_id
                        }
                    }).then (resolve => {
                        return res.json(resolve)
                    })
                }
                else {
                    EventModel.findAll( {
                        where: {
                            type_id: type_id
                        }
                    }).then (resolve => {
                        return res.json(resolve)
                    })
                }
            }
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
    async getByOrg(req, res, next){
        try {
            const {organizationId} = req.params;
            EventModel.findAll ({
                where:{
                    organization_id: organizationId
                }
            }).then(resolve => {
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
    
}

module.exports = new EventController();