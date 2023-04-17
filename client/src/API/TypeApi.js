import axios from "axios";

const api = axios.create({
    baseURL:"https://uevent-vbondarets.pp.ua/api"
})

export const getAllTypes = () => api.get('https://uevent-vbondarets.pp.ua/api/event/types')