import { combineReducers } from "redux";
import emailReducer from "./Email/email.reducer";
import userReducer from "./User/user.reducer";
import adminReducer from "./Admin/admin.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    email: emailReducer,
    admin: adminReducer
});

export default rootReducer;
