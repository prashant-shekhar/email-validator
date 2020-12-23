import { LOGIN, LOGOUT } from "./user.types";

export const loginUser = (payload) => {
    return {
        type: LOGIN,
        payload: payload
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT,
    };
};
