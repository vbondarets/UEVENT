import axios from "axios";

export default class EventSevice {
    static async getAll() {
        const response = await axios.get("https://uevent-vbondarets.pp.ua/api/event");
        return response;
    }
    static async create(body) {
        const response = await axios.post("https://uevent-vbondarets.pp.ua/api/event", body);
        return response;
    }
    static async getById(id) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/event/${id}`);
        return response;
    }
    static async getByOrg(id) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/event/org/${id}`);
        return response;
    }
    static async update(body, id) {
        const response = await axios.patch(`https://uevent-vbondarets.pp.ua/api/event/${id}`, body);
        return response;
    }
    static async delete(id) {
        const response = await axios.delete(`https://uevent-vbondarets.pp.ua/api/event/${id}`);
        return response;
    }
}