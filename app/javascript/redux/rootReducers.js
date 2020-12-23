import { combineReducers } from "redux";
import emailReducer from "./Email/email.reducer";
import userReducer from "./User/user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    email: emailReducer,
});

export default rootReducer;
