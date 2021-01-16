import { FETCH_ATTACHMENT_SUCCESS, CREATE_ATTACHMENT_SUCCESS } from "./attachment.types";

export const fetchAttachmentSuccess = (payload) => {
    return {
        type: FETCH_ATTACHMENT_SUCCESS,
        payload: payload,
    };
};


export const createAttachmentSuccess = (payload) => {
    return {
        type: CREATE_ATTACHMENT_SUCCESS,
        payload: payload,
    };
};
