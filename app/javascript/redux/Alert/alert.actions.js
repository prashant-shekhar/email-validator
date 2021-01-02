import { SHOW_SUCCESS_ALERT,SHOW_ERROR_ALERT } from "./alert.types";

export const showSuccessAlert = (payload) => {
    return {
        type: SHOW_SUCCESS_ALERT,
        payload: payload,
    };
};

export const showErrorAlert = (payload) => {
    return {
        type: SHOW_ERROR_ALERT,
        payload: payload,
    };
};
