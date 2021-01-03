import {
    SHOW_ALERT,
    HIDE_ALERT
} from "./alert.types";

const INITIAL_STATE = {
    successAlert: false,
    errorAlert:false,
    strongMessage:"",
    message:""
};

const alertReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return {
                ...state,
                successAlert: action.payload.successAlert,
                errorAlert: action.payload.errorAlert,
                strongMessage: action.payload.strongMessage,
                message:action.payload.message
            };
        case HIDE_ALERT:
            return {
                ...state,
                successAlert: false,
                errorAlert: false,
                strongMessage:"",
                message:""
            };
        default:
            return state;
    }
};

export default alertReducer;
