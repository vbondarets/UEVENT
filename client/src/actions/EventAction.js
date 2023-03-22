import { getAllCategories, getAllEvents, getAllTypes, getEventById, sort } from "../API/EventApi"

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

export const getTypes = () => async(dispatch) => {
    try {
        const {data} = await getAllTypes()
        if (data.length > 0) {
            return dispatch( { type: 'getTypes', payload: data})   
        }
    } catch (error) {
        console.log(error);
    }
}

export const sortEvents = (category_id, type_id) => async(dispatch) => {
    try {
        if (category_id.length === 0 && type_id.length === 0) {
            const Data = await getAllEvents()
            if(Data.data.length > 0) {
                return dispatch({type:'getAllEvents', payload:Data.data})
            }
            else {
                return dispatch({type:'getAllEvents', payload:[]})
            }
        }
        else {
            let arrEvents = []
            let info = []
            if (type_id.length === 0) {
                for (let index = 0; index < category_id.length; index++) {
                    const {data} = await sort(category_id[index])
                    for (let i = 0; i < data.length; i++) {
                        info.push(data[i])
                    }
                }
            }
            if (category_id.length === 0) {
                for (let index = 0; index < type_id.length; index++) {
                    const {data} = await sort(type_id[index])
                    for (let i = 0; i < data.length; i++) {
                        info.push(data[i])
                    }
                }
            }
            else {
                for (let index = 0; index < category_id.length; index++) {
                    for (let j = 0; j < type_id.length; j++) {
                        const {data} = await sort(category_id[index], type_id[j])
                        for (let i = 0; i < data.length; i++) {
                            info.push(data[i])
                        }
                    }
                }
            }
            for (let i = 0; i < info.length; i++) {
                arrEvents.push(info[i])
            }
            console.log(arrEvents);
            if (arrEvents.length > 0) {
                return dispatch({type:'sortCategories', payload:arrEvents})
            }
            if (arrEvents.length === 0) {
                return dispatch({type:'sortCategories', payload:[]})
            }
            // if (arrEvents === 'No events in this category'){
            //     return dispatch({type:'sortCategories', payload:arrEvents})
            // }
        }
    } catch (error) {
        console.log(error);
    }
}