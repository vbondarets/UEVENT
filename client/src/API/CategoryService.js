import axios from "axios";

export default class CategorySevice {
    static async getAll() {
        const response = await axios.get("http://localhost:8080/api/category");
        return response;
    }
    static async create(body) {
        const response = await axios.post("http://localhost:8080/api/category", body);
        return response;
    }
    static async getById(id) {
        const response = await axios.get(`http://localhost:8080/api/category/${id}`);
        return response;
    }
    static async update(body, id) {
        const response = await axios.patch(`http://localhost:8080/api/category/${id}`, body);
        return response;
    }
    static async delete(id) {
        const response = await axios.delete(`http://localhost:8080/api/category/${id}`);
        return response;
    }
}