import {
    FETCH_ATTACHMENT_SUCCESS,
} from "./attachment.types";

const INITIAL_STATE = {
    attachments: [],
};

const attachmentReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ATTACHMENT_SUCCESS:
            return {
                attachments: action.payload,
            };
        default:
            return state;
    }
};

export default attachmentReducer;
