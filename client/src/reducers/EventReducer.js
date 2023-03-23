const initialState = {
    allEvents: [],
    Event: [],
    categories:[],
    types:[],
    map:[]
}

export const EventReducer = (events = initialState, action) => {
    switch (action.type) {
        case `getAllEvents`:
            return {...events, allEvents: action.payload}
        case 'getEvent':
            return {...events, Event: action.payload}
        case 'getCategories':
            return {...events, categories: action.payload}
        case 'getTypes':
            return {...events, types: action.payload}
        case 'map':
            return {...events, map: action.payload}
        
        case 'sortCategories':
            return {...events, allEvents: action.payload}
        default:
            return events;
    }
}