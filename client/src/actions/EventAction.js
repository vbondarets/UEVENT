import moment from "moment"
import { createEventApi, deleteE, DeleteSub, getAllCategories, getAllEvents,getAllSubs,getEventById, getLanLog, sort, Subscripe } from "../API/EventApi"

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

export const createEvent = (name, startDateTime, endDateTime, tickets_count, region, imgLink, category_id, price, description, type_id, organization_id) => async(dispatch) => {
    try {
        const {data} = await createEventApi(name, startDateTime, endDateTime, tickets_count, region, imgLink, category_id, price, description, type_id, organization_id)
        if (data === "Event created") {
            const Data = await getAllEvents()
            if(Data.data.length > 0) {
                return dispatch({type:'createEvent', payload: Data.data})
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const getAllSubsOnEvent = (event_id) => async(dispatch) => {
    try {
        const {data} = await getAllSubs(event_id)
        console.log(data);
        if (data.length > 0) {
            return dispatch( {type:'getSubs', payload: data} )
        }
    } catch (error) {
        console.log(error);
    }
}

export const SubscribeOnEvent = (event_id, user_id) => async (dispatch)=> {
    try {
        const {data} = await Subscripe(event_id, user_id)
        if (data === 'You subscripe on event') {
            const Data = await getAllSubs(event_id)
            if (Data.data.length > 0) {
                return dispatch({type:'subscribeEvent', payload: Data.data})
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export const DeleteSubscribe = (event_id, user_id) => async(dispatch) => {
    try {
        const {data} = await DeleteSub(event_id, user_id)
        console.log(data);
        if (data === 'You dissubscribe on event') {
            const Data = await getAllSubs(event_id)
            if (Data.data.length > 0) {
                return dispatch({type:'deleteSub', payload: Data.data})
            }
        }
    } catch (error) {
        console.log(error);
        return dispatch({type:'deleteSub', payload: []})
    }
}


export const getMap = (address) => async(dispatch) => {
    try {
        const Data = await getLanLog(address)
        console.log(Data);
        const info = Data.data.results
        if (info.length === 0) {
            return dispatch( {type:'map', payload:null})
        }
        else {
            return dispatch( {type:'map', payload:info[0].geometry.location})
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
                    const {data} = await sort(category_id[index], undefined)
                    for (let i = 0; i < data.length; i++) {
                        info.push(data[i])
                    }
                }
            }
            if (category_id.length === 0) {
                for (let index = 0; index < type_id.length; index++) {
                    const {data} = await sort(undefined, type_id[index])
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

export const DeleteEvent = (event_id) => async(dispatch) => {
    try {
        const {data} = await deleteE(event_id)
        const Data = await getAllEvents()
        if (Data.data.length > 0) {
            return dispatch({type:'deleteEvent', payload:Data.data})
        }
    } catch (error) {
        console.log(error);
    }
}

export const SortByTime = (type) => async(dispatch) => {
    try {
        console.log(type);
        const {data} = await getAllEvents()
        if (data.length > 0) {
            if (type === 'new') {
                console.log(10);
                data.sort((a,b)=> moment(b.startDateTime) - moment(a.startDateTime) )
                console.log(data);
                return dispatch({type:"sortBytime", payload:data})
            }
            if (type === 'old') {
                console.log(20);
                data.sort((a,b)=> moment(a.startDateTime) - moment(b.startDateTime))
                console.log(data);
                return dispatch({type:"sortBytime", payload:data})
            }
            if (type === '') {
                return dispatch({type:"sortBytime", payload:data})
            }
        }
    } catch (error) {
        console.log(error);
    }
}