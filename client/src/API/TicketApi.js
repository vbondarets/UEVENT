import axios from "axios";

const api = axios.create({
    baseURL:"https://uevent-vbondarets.pp.ua/api"
})

export const getTicketOnEv = (event_id) => api.get(`https://uevent-vbondarets.pp.ua/api/ticket/list/${event_id}`)
export const buyTicket = (order_id, order_desc, currency, merchant_data, promoCode, amount) => 
    api.post(`https://uevent-vbondarets.pp.ua/api/payment/create`, 
        {order_id:order_id, order_desc:order_desc, currency:currency, merchant_data:merchant_data, promoCode:promoCode, amount:amount}
    )