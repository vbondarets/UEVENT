import {combineReducers} from "redux";
import { AuthReducer } from "./AuthReducer";
import { CommentReducer } from "./CommentReducer";
import { EventReducer } from "./EventReducer";
import { OrganizationReducer } from "./OrganizationReducer";
import { TicketReducer } from "./TicketReducer";
import { TypeReducer } from "./TypeReducer";


const Reducer = combineReducers({
    Auth:AuthReducer,
    Events:EventReducer,
    Organization: OrganizationReducer,
    Type: TypeReducer,
    Comment: CommentReducer,
    Ticket: TicketReducer
})

export default Reducer