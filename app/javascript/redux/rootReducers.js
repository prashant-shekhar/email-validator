import { combineReducers } from "redux";
import emailReducer from "./Email/email.reducer";
import userReducer from "./User/user.reducer";
import adminReducer from "./Admin/admin.reducer";
import alertReducer from "./Alert/alert.reducer";
import attachmentReducer from "./Attachment/attachment.reducer"

const rootReducer = combineReducers({
    user: userReducer,
    email: emailReducer,
    admin: adminReducer,
    alert: alertReducer,
    attachment: attachmentReducer
});

export default rootReducer;
