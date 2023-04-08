const initialState = {
    tickets_On_Event: []
}

export const TicketReducer = (tickets = initialState, action) => {
    switch (action.type) {
        case 'getTicketsOnEvent':
            return {...tickets, tickets_On_Event:action.payload}    
        case 'buy_ticket':
            return {...tickets, tickets_On_Event:action.payload}
        default:
            return tickets;
    }
}