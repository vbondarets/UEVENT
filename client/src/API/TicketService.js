///check/:token
import axios from "axios";

export default class TicketSevice {
    static async check(token) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/ticket/check/${token}`);
        return response;
    }
}