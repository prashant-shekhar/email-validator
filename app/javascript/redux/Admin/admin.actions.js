import {ADMIN_USER_CREATE_SUCCESS, USER_VALIDATE_SUCCESS, FETCH_USER_SUCCESS} from './admin.types';

export const adminUserCreateSuccess= (payload)=> {
    return {
        type:ADMIN_USER_CREATE_SUCCESS,
        payload: payload
    }
}

export const userValidateSuccess= (payload)=> {
    return {
        type:USER_VALIDATE_SUCCESS,
        payload: payload
    }
}

export const fetchUserSuccess= (payload)=> {
    return {
        type:FETCH_USER_SUCCESS,
        payload: payload
    }
}