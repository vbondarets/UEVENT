import axios from "axios";

const api = axios.create({
    baseURL:"https://uevent-vbondarets.pp.ua/api"
})

export default class OrgSevice {
    static async getAll() {
        const response = await axios.get("https://uevent-vbondarets.pp.ua/api/organization");
        return response;
    }
    static async create(body) {
        const response = await axios.post("https://uevent-vbondarets.pp.ua/api/organization", body);
        return response;
    }
    static async getById(id) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/organization/${id}`);
        return response;
    }
    static async getByCreator(id) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/organization/author/${id}`);
        return response;
    }
    static async update(body, id) {
        const response = await axios.patch(`https://uevent-vbondarets.pp.ua/api/organization/${id}`, body);
        return response;
    }
    static async delete(id) {
        const response = await axios.delete(`https://uevent-vbondarets.pp.ua/api/organization/delete/${id}`);
        return response;
    }
    static async createPost(body) {
        const response = await axios.post("https://uevent-vbondarets.pp.ua/api/organization/post", body);
        return response;
    }
    static async getByOrg(id) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/organization/${id}/post`);
        return response;
    }
    static async updatePost(body) {
        const response = await axios.patch(`https://uevent-vbondarets.pp.ua/api/organization/post`, body);
        return response;
    }
    static async deletePost(id) {
        const response = await axios.delete(`https://uevent-vbondarets.pp.ua/api/organization/post/${id}`);
        return response;
    }
    static async getSub(body) {
        const response = await axios.post(`https://uevent-vbondarets.pp.ua/api/organization/get-sub`, body);
        return response;
    }
    static async createSub(body) {
        const response = await axios.post(`https://uevent-vbondarets.pp.ua/api/organization/sub`, body);
        return response;
    }
    static async deleteSub(body) {
        const response = await axios.delete(`https://uevent-vbondarets.pp.ua/api/organization/sub`, {data: body});
        return response;
    }
}

export const getOrganizations = () => api.get(`https://uevent-vbondarets.pp.ua/api/organization`)
