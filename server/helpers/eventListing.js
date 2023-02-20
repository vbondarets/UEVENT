const data = require('../data.json');
const { EventModel } = require('../models/eventModel');
const ApiError = require("../helpers/error/ApiError");
const sportEventService = require("../services/sportEventApi");
const moment = require('moment');


const eventListing = async () => {
    let eventList = []
    sportEventService.getAll().then(resolve => {
        if (resolve.length > 0) {
            resolve.forEach(async (element, index) => {
                if (element.type === "event") {
                    let Event = {
                        name: element.name,
                        type: element.type,
                        startDateTime: element.dates.start.dateTime,
                        endDateTime: moment(element.dates.start.dateTime).add(3, 'hours'),
                        tickets: Math.floor(Math.random() * 600),
                        region: element.locale,
                        imgLink: element.images[1].url
                    }
                    eventList.push(Event);
                }
            });
            EventModel.findAll().then(async (resolve) => {
                if (resolve.length > 0) {
                    if (resolve.lenght < 70) {
                        EventModel.drop().finally(() => {
                            eventList.forEach((Event) => {
                                EventModel.create(Event).catch(err => {
                                    return ApiError.internal('Unknown error: ' + err);
                                });
                            });
                        })
                    }
                }
                else {
                    eventList.forEach((Event) => {
                        EventModel.create(Event).catch(err => {
                            return ApiError.internal('Unknown error: ' + err);
                        });
                    });

                }
            }).catch(error => {
                eventList.forEach((Event) => {
                    EventModel.create(Event).catch(err => {
                        return ApiError.internal('Unknown error: ' + err);
                    });
                });
            });
        }
        return (ApiError.badRequest('Not Found'));
    }).catch(err => {
        return (ApiError.internal('Unknown error: ' + err));
    });
}

module.exports = eventListing