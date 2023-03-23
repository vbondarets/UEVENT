import {combineReducers} from "redux";
import { AuthReducer } from "./AuthReducer";
import { EventReducer } from "./EventReducer";
import { OrganizationReducer } from "./OrganizationReducer";
import { TypeReducer } from "./TypeReducer";


const Reducer = combineReducers({
    Auth:AuthReducer,
    Events:EventReducer,
    Organization: OrganizationReducer,
    Type: TypeReducer
})

export default Reducer