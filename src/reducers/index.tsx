import keyboardReducer from "./keyboardReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";



const rootReducers = combineReducers({
    user: userReducer,
    keyboard: keyboardReducer
})

export default rootReducers