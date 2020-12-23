import { LOGIN, LOGOUT } from "./user.types";

const INITIAL_STATE = {
    token: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: true,
            };
        case LOGOUT:
            return {
                ...state,
                token: false,
            };
        default:
            return state;
    }
};

export default userReducer;
