import { getAllEvents, getEventById } from "../API/EventApi"

export const getAllEventsAction = () => async(dispatch) => {
    try {
        const {data} = await getAllEvents()
        if(data.length > 0) {
            return dispatch({type:'getAllEvents', payload:data})
        }
        else {
            return dispatch({type:'getAllEvents', payload:"No events yet"})
        }
    } catch (error) {
        console.log(error);
    }
}

export const EventById = (id) => async(dispatch) => {
    try {
        const {data} = await getEventById(id)
        if (data.length > 0) {
            return dispatch({type:'getEvent', payload:data})
        }
        else {
            return dispatch({type:'getEvent', payload:"Fuck"})
        }
    } catch (error) {
        console.log(error);
    }
}