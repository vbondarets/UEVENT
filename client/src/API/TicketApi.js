import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:8080/api"
})

export const getTicketOnEv = (event_id) => api.get(`http://localhost:8080/api/ticket/list/${event_id}`)
export const buyTicket = (order_id, order_desc, currency, merchant_data, promoCode, amount) => 
    api.post(`http://localhost:8080/api/payment/create`, 
        {order_id:order_id, order_desc:order_desc, currency:currency, merchant_data:merchant_data, promoCode:promoCode, amount:amount}
    )