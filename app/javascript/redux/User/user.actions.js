import { LOGIN, LOGOUT } from "./user.types";

export const loginUser = () => {
    return {
        type: LOGIN,
    };
};

export const logoutUser = () => {
    return {
        type: LOGOUT,
    };
};
