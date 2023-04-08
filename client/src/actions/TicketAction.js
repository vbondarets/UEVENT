import { getTicketOnEv } from "../API/TicketApi";

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