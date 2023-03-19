const initialState = {
    allEvents: [],
    Event: []
}

export const EventReducer = (events = initialState, action) => {
    switch (action.type) {
        case `getAllEvents`:
            return {...events, allEvents: action.payload}
        case 'getEvent':
            return {...events, Event: action.payload}
        default:
            return events;
    }
}