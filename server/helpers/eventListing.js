const data = require('../data.json');
const { EventModel } = require('../models/eventModel');
const ApiError = require("../helpers/error/ApiError");
const sportEventService = require("../services/sportEventApi");
const moment = require('moment');

const categoryParsing = (eventName) => {
    const result = eventName.split('vs.');
    // console.log(result);
    if(result.length >= 2){
        if(result[0].length > 0 && result[1].length > 0){
            return 1
        }
        else {
            return 2
        }
    }
    else {
        return 2
    }
}

const eventListing = async () => {
    let eventList = []
    sportEventService.getAll().then(resolve => {
        if (resolve.length > 0) {
            resolve.forEach(async (element, index) => {
                if (element.type === "event") {
                    let Event = {
                        name: element.name,
                        startDateTime: element.dates.start.dateTime,
                        endDateTime: moment(element.dates.start.dateTime).add(3, 'hours'),
                        tickets: Math.floor(Math.random() * 600),
                        region: element.locale,
                        imgLink: element.images[1].url,
                        category_id: categoryParsing(element.name)
                    }
                    eventList.push(Event);
                }
            });
            EventModel.findAll().then(async (resolve) => {
                if (resolve.length > 0) {
                    if (resolve.length < 70) {
                        EventModel.drop().finally(() => {
                            if (eventList.length > 0) {
                                eventList.forEach((Event) => {
                                    EventModel.create(Event).then(resolve => {
                                        console.log(resolve.dataValues.event_id)
                                    }).catch(err => {
                                        return ApiError.internal('Unknown error: ' + err);
                                    });
                                });
                            }
                        })
                    }
                }
                else {
                    if (eventList.length > 0) {
                        eventList.forEach((Event) => {
                            EventModel.create(Event).then(resolve => {
                                console.log(resolve.dataValues.event_id)
                            }).catch(err => {
                                return ApiError.internal('Unknown error: ' + err);
                            });
                        });
                    }

                }
            }).catch(error => {
                if (eventList.length > 0) {
                    eventList.forEach((Event) => {
                        EventModel.create(Event).then(resolve => {
                            console.log(resolve.dataValues.event_id)
                        }).catch(err => {
                            return ApiError.internal('Unknown error: ' + err);
                        });
                    });
                }
                else {
                    return (ApiError.badRequest('Not Found'));
                }

            });
        }
        return (ApiError.badRequest('Not Found'));
    }).catch(err => {
        return (ApiError.internal('Unknown error: ' + err));
    });
}

module.exports = eventListing