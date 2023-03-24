import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:8080/api"
})

export const getCommnent_Event = (event_id) => api.get(`http://localhost:8080/api/comment/event/${event_id}`)
export const getAllUsers = () => api.get('http://localhost:8080/api/auth/users')
export const createCom = (comment, event_id, user_id) => api.post('http://localhost:8080/api/comment/', {event_id:event_id, comment:comment, user_id: user_id})