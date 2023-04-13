const moment = require ('moment');
const { EventModel, EventSubModel } = require('../models/eventModel');
const { UserModel } = require('../models/userModel');
const notificationMailingService = require('./notification/notificationMailService');
const subQueue = async() =>{
    let eventArr = [];
    // console.log(moment(' April 14th 2023', 'MMMM Do YYYY').startOf('day').fromNow());
    console.log(moment('2023-04-13T04:00:00.000Z', "YYYY-MM-DDTHH:mm:ss.SSS").startOf('hour').fromNow());
    setInterval(() => {
        console.log(eventArr);
        if(eventArr.length > 0){
            eventArr.forEach(async (E_Event, event_index) => {
                const string = moment(E_Event.startDateTime, "YYYY-MM-DDTHH:mm:ss.SSS").startOf('hour').fromNow();
                const stringArr = string.split(' ');
                if(stringArr[2] === "hour" || stringArr[2] === "minutes" || stringArr[2] === "minute"){
                    EventModel.findOne({where: {event_id: E_Event.event_id}}).then((e_event) => {
                        EventSubModel.findAll({where: {event_id: e_event.event_id}}).then((subs) => {
                            if(subs.length > 0){
                                subs.forEach(async (sub, sub_index) => {
                                    UserModel.findOne({where:{user_id: sub.user_id}}).then(User => {
                                        notificationMailingService({
                                            link: `http://localhost:3000/events/${e_event.event_id}`,
                                            text: `Hello dear ${User.fullna}\n\nEvent:\n ${e_event.name}\n will start in one hour`,
                                            header: `Event is comming`
                                        }, User.email);
                                        eventArr.splice(event_index, 1);
                                    })
                                });
                            }
                        });
                    });
                }
            });
        }
    }, 1000* 60) // * 60
    setInterval(() => {
        eventArr = [];
        EventModel.findAll().then((res) => {
            res.forEach(async (E_Event, index) => {
                const string = moment(E_Event.startDateTime, "YYYY-MM-DDTHH:mm:ss.SSS").startOf('day').fromNow();
                const stringArr = string.split(' ');
                if(stringArr[2] === "hours" || stringArr[2] === "hour"){
                    eventArr.push({event_id: E_Event.event_id, time: E_Event.startDateTime});
                }
            });
        });
    }, 1000 * 60 * 60 * 24) //* 60 * 60 * 24
}

module.exports = subQueue;