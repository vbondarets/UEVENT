import axios from "axios";

export default class CategorySevice {
    static async getAll() {
        const response = await axios.get("https://uevent-vbondarets.pp.ua/api/category");
        return response;
    }
    static async create(body) {
        const response = await axios.post("https://uevent-vbondarets.pp.ua/api/category", body);
        return response;
    }
    static async getById(id) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/category/${id}`);
        return response;
    }
    static async update(body, id) {
        const response = await axios.patch(`https://uevent-vbondarets.pp.ua/api/category/${id}`, body);
        return response;
    }
    static async delete(id) {
        const response = await axios.delete(`https://uevent-vbondarets.pp.ua/api/category/${id}`);
        return response;
    }
}