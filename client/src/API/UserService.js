import axios from "axios";

export default class UserSevice {
    static async login(body) {
        const response = await axios.post("https://uevent-vbondarets.pp.ua/api/auth/login", body);
        return response;
    }
    static async register(body) {
        const response = await axios.post("https://uevent-vbondarets.pp.ua/api/auth/register", body);
        return response;
    }
    static async logout() {
        const response = await axios.get("https://uevent-vbondarets.pp.ua/api/auth/logout");
        return response;
    }
    static async getUserById(id) {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/auth/user/${id}`);
        return response;
    }
    static async getAll() {
        const response = await axios.get(`https://uevent-vbondarets.pp.ua/api/users`);
        return response;
    }
    static async changeUserById(body, id) {
        const response = await axios.patch(`https://uevent-vbondarets.pp.ua/api/users/${id}`, body);
        return response;
    }
    static async deleteUser(id) {
        const response = await axios.delete(`https://uevent-vbondarets.pp.ua/api/users/${id}`);
        return response;
    }
	static async requestPasswordReset(email) {
		const response = await axios.post(`https://uevent-vbondarets.pp.ua/api/auth/password-reset`, {email: email});
		return response;
	}
	static async resetPassword(token, pass) {
		const response = await axios.post(`https://uevent-vbondarets.pp.ua/api/auth/password-reset/${token}`, {token: token, password: pass});
		return response;
	}
}