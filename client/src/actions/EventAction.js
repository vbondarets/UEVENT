import { getAllCategories, getAllEvents, getEventById, sortByCategories } from "../API/EventApi"

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

export const getAllCategory = () => async(dispatch) => {
    try {
        const data = await getAllCategories()
        if (data.data.length > 0) {
            return dispatch({type:'getCategories', payload:data.data})
        }
    } catch (error) {
        console.log(error);
    }
}

export const sortByCategory = (category_id) => async(dispatch) => {
    try {
        console.log(category_id);
        if (category_id.length === 0) {
            const Data = await getAllEvents()
            if(Data.data.length > 0) {
                return dispatch({type:'getAllEvents', payload:Data.data})
            }
            else {
                return dispatch({type:'getAllEvents', payload:"No events yet"})
            }
        }
        else {
            let arrEvents = []
            for (let index = 0; index < category_id.length; index++) {
                const {data} = await sortByCategories(category_id[index])
                for (let i = 0; i< data.length; i++) {
                    arrEvents.push(data[i])
                }
            }
            console.log(arrEvents);
            if (arrEvents.length > 0) {
                return dispatch({type:'sortCategories', payload:arrEvents})
            }
            // if (arrEvents === 'No events in this category'){
            //     return dispatch({type:'sortCategories', payload:arrEvents})
            // }
        }
    } catch (error) {
        console.log(error);
    }
}