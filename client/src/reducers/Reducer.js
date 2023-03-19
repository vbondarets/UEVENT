import {combineReducers} from "redux";
import { AuthReducer } from "./AuthReducer";
import { EventReducer } from "./EventReducer";


const Reducer = combineReducers({
    Auth:AuthReducer,
    Events:EventReducer,
})

export default Reducer