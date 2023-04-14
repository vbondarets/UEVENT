import axios from "axios";

const api = axios.create({
    baseURL:"https://uevent-vbondarets.pp.ua/api"
})

export const getCommnent_Event = (event_id) => api.get(`https://uevent-vbondarets.pp.ua/api/comment/event/${event_id}`)
export const getAllUsers = () => api.get('https://uevent-vbondarets.pp.ua/api/auth/users')

export const createCom = (comment, event_id, user_id) => 
    api.post('https://uevent-vbondarets.pp.ua/api/comment/', {event_id:event_id, comment:comment, user_id: user_id})

export const DeleteCom = (comment_id, user_id) => 
    api.delete(`https://uevent-vbondarets.pp.ua/api/comment/delete/${comment_id}/user/${user_id}`)
