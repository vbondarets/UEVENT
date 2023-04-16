import { getTicketOnEv } from "../API/TicketApi";
import { buyTicket } from "../API/TicketApi";


export const getAllTicketsOnEvent = (event_id) => async(dispatch) => {
    try {
        const {data} = await getTicketOnEv(event_id)
        if (data.length > 0) {
            return dispatch({type:`getTicketsOnEvent`, payload: data})
        } 
        else {
            return dispatch({type:`getTicketsOnEvent`, payload: []})
        }
    } catch (error) {
        console.log(error);
    }
}


export const buyTickets = (order_id, order_desc, currency, merchant_data, promoCode, amount) => async(dispatch) => {
    try {
        const data = await buyTicket(order_id, order_desc, currency, merchant_data, promoCode, amount)
        // console.log(data.data.response.checkout_url)
        window.location.href = data.data.response.checkout_url;
        // return dispatch({type:"buy_ticket", payload: data});
    } catch (error) {
        console.log(error);
    }
}