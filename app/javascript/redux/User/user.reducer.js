import { LOGIN, LOGOUT } from "./user.types";

const INITIAL_STATE = {
    token: null,
    user: null,
    isLoggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isLoggedIn: action.payload.isLoggedIn,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
                user: null,
                isLoggedIn: false,
            };
        default:
            return state;
    }
};

export default userReducer;
