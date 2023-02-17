const axios = require('axios');

class sportEventSevice {
    async getAll (){
        try {
            const resp = await axios.get("https://app.ticketmaster.com/discovery/v2/events.json?size=200&apikey=xyg3KahQSZd1NnGAd7s6AQgceRumX72Q");
            return resp.data._embedded.events;
        } catch (error) {
            if(error.response.data){
                return error.response.data;
            }
            else{
                return "Error"
            }
        }
    }
}

module.exports = new sportEventSevice();