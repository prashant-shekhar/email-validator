import {
    SHOW_SUCCESS_ALERT,
    SHOW_ERROR_ALERT
} from "./alert.types";

const INITIAL_STATE = {
    successAlert: false,
    errorAlert:false
};

const alertReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_SUCCESS_ALERT:
            return {
                ...state,
                successAlert: action.payload.successAlert,
                errorAlert: action.payload.errorAlert
            };
        case SHOW_ERROR_ALERT:
            return {
                ...state,
                successAlert: action.payload.successAlert,
                errorAlert: action.payload.errorAlert
            };
        default:
            return state;
    }
};

export default alertReducer;
