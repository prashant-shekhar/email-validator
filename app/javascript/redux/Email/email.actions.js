import { FETCH_EMAIL_SUCCESS, CREATE_EMAIL_SUCCESS } from "./email.types";

export const fetchEmailSuccess = (payload) => {
    return {
        type: FETCH_EMAIL_SUCCESS,
        payload: payload,
    };
};

export const createEmailSuccess = (payload) => {
    return {
        type: CREATE_EMAIL_SUCCESS,
        payload: payload,
    };
};
