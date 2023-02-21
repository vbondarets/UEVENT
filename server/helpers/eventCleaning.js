const { EventModel } = require('../models/eventModel');
const moment = require('moment');

const compareDates = (start, nowDay) => {
    let date1 = new Date(start).getTime();
    let date2 = new Date(nowDay).getTime();
  
    if (date1 < date2) {
      return true;
    } 
    else {
      return false;
    } 
  };

const eventCleaning = async () => {
    EventModel.findAll().then(async (resolve) => {
        if (resolve.length > 0) {
            resolve.forEach(element => {
                const start = moment(element.startDateTime).format("MM/DD/YYYY");
                const nowDay = moment().format("MM/DD/YYYY");
                if(compareDates(start, nowDay)){
                    EventModel.destroy({
                        where: {
                            event_id: element.event_id
                        }
                    })
                }
            });
        }
    }).catch(error => {
        console.log("Error in eventCleaning: " + error)
    });
}

module.exports = eventCleaning;