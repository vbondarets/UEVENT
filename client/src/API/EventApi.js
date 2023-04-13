import axios from "axios";

const api = axios.create({
    baseURL:"https://uevent-vbondarets.pp.ua/api"
})

export const getAllEvents = () => api.get('https://uevent-vbondarets.pp.ua/api/event/')
export const getEventById = (id) => api.get(`https://uevent-vbondarets.pp.ua/api/event/event/${id}`)
export const getAllCategories = () => api.get('https://uevent-vbondarets.pp.ua/api/event/allcategories')
export const getLanLog = (address) => api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=Apikey`)
export const getAllSubs = (event_id) => api.get(`https://uevent-vbondarets.pp.ua/api/event/subscribe/${event_id}`)

export const Subscripe = (event_id, user_id) => api.post(`https://uevent-vbondarets.pp.ua/api/event/subscripe/${event_id}`, {user_id: user_id})
export const createEventApi = (name, startDateTime, endDateTime, tickets_count, region, imgLink, category_id, price, description, type_id, organization_id) => 
    api.post('https://uevent-vbondarets.pp.ua/api/event/', 
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

export const DeleteSub = (event_id, user_id) => api.delete(`https://uevent-vbondarets.pp.ua/api/event/subscripe/${event_id}/user/${user_id}`)

export const sort = (category_id, type_id) => api.get(`https://uevent-vbondarets.pp.ua/api/event/sort/${category_id}/${type_id}`)