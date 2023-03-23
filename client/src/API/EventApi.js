import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:8080/api"
})

export const getAllEvents = () => api.get('http://localhost:8080/api/event/')
export const getEventById = (id) => api.get(`http://localhost:8080/api/event/event/${id}`)
export const getAllCategories = () => api.get('http://localhost:8080/api/event/allcategories')
export const getLanLog = (address) => api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCDY1JcSvcRDQw6KD4jXqsbreVFzw8JN9g`)

export const sort = (category_id, type_id) => api.get(`http://localhost:8080/api/event/sort/${category_id}/${type_id}`)