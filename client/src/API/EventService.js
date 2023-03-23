import axios from "axios";

export default class EventSevice {
    static async getAll() {
        const response = await axios.get("http://localhost:8080/api/event");
        return response;
    }
    static async create(body) {
        const response = await axios.post("http://localhost:8080/api/event", body);
        return response;
    }
    static async getById(id) {
        const response = await axios.get(`http://localhost:8080/api/event/${id}`);
        return response;
    }
    static async update(body, id) {
        const response = await axios.patch(`http://localhost:8080/api/event/${id}`, body);
        return response;
    }
    static async delete(id) {
        const response = await axios.delete(`http://localhost:8080/api/event/${id}`);
        return response;
    }
}