import { FETCH_EMAIL_SUCCESS, CREATE_EMAIL_SUCCESS } from "./email.types";

const INITIAL_STATE = {
    emails: []
};

const emailReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_EMAIL_SUCCESS:
            return {
                emails: action.payload
            };
        case CREATE_EMAIL_SUCCESS:
            return {
                emails: [action.payload,...state.emails]
            };
        default:
            return state;
    }
};

export default emailReducer;
