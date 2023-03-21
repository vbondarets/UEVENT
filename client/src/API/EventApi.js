import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:8080/api"
})

export const getAllEvents = () => api.get('http://localhost:8080/api/event/')
export const getEventById = (id) => api.get(`http://localhost:8080/api/event/${id}`)
export const getAllCategories = () => api.get('http://localhost:8080/api/event/allcategories')
export const sortByCategories = (category_Id) => api.get(`http://localhost:8080/api/event/categories/${category_Id}`)