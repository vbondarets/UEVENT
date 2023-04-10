import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:8080/api"
})

export default class OrgSevice {
    static async getAll() {
        const response = await axios.get("http://localhost:8080/api/organization");
        return response;
    }
    static async create(body) {
        const response = await axios.post("http://localhost:8080/api/organization", body);
        return response;
    }
    static async getById(id) {
        const response = await axios.get(`http://localhost:8080/api/organization/${id}`);
        return response;
    }
    static async getByCreator(id) {
        const response = await axios.get(`http://localhost:8080/api/organization/author/${id}`);
        return response;
    }
    static async update(body, id) {
        const response = await axios.patch(`http://localhost:8080/api/organization/${id}`, body);
        return response;
    }
    static async delete(id) {
        const response = await axios.delete(`http://localhost:8080/api/organization/${id}`);
        return response;
    }
    static async createPost(body) {
        const response = await axios.post("http://localhost:8080/api/organization/post", body);
        return response;
    }
    static async getByOrg(id) {
        const response = await axios.get(`http://localhost:8080/api/organization/${id}/post`);
        return response;
    }
    static async updatePost(body) {
        const response = await axios.patch(`http://localhost:8080/api/organization/post`, body);
        return response;
    }
    static async deletePost() {
        const response = await axios.delete(`http://localhost:8080/api/organization/post`);
        return response;
    }
}

export const getOrganizations = () => api.get(`http://localhost:8080/api/organization`)
