import { SHOW_ALERT,HIDE_ALERT } from "./alert.types";

export const showAlert = (payload) => {
    return {
        type: SHOW_ALERT,
        payload: payload,
    };
};

export const hideAlert = (payload) => {
    return {
        type: HIDE_ALERT,
    };
};
