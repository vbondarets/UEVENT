import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:8080/api"
})

export const getTicketOnEv = (event_id) => api.get(`http://localhost:8080/api/ticket/list/${event_id}`)