import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:8080/api"
})

export const getAllEvents = () => api.get('http://localhost:8080/api/event/')
export const getEventById = (id) => api.get(`http://localhost:8080/api/event/event/${id}`)
export const getAllCategories = () => api.get('http://localhost:8080/api/event/allcategories')
export const getLanLog = (address) => api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBabtxg-u839rG6tmVUIZXD1DoOVcNhyIk`)
export const getAllSubs = (event_id) => api.get(`http://localhost:8080/api/event/subscribe/${event_id}`)

export const Subscripe = (event_id, user_id) => api.post(`http://localhost:8080/api/event/subscripe/${event_id}`, {user_id: user_id})
export const createEventApi = (name, startDateTime, endDateTime, tickets_count, region, imgLink, category_id, price, description, type_id, organization_id) => 
    api.post('http://localhost:8080/api/event/', 
            {   name: name, 
                startDateTime: startDateTime, 
                endDateTime: endDateTime, 
                tickets_count: tickets_count, 
                region: region, 
                imgLink: imgLink, 
                category_id: category_id, 
                price: price, 
                description: description, 
                type_id: type_id, 
                organization_id: organization_id
            }
        )

export const DeleteSub = (event_id, user_id) => api.delete(`http://localhost:8080/api/event/subscripe/${event_id}/user/${user_id}`)
export const deleteE = (event_id) => api.delete(`http://localhost:8080/api/event/delete/${event_id}`)

export const sort = (category_id, type_id) => api.get(`http://localhost:8080/api/event/sort/${category_id}/${type_id}`)