import {ADMIN_USER_CREATE_SUCCESS, USER_UPDATE_SUCCESS, FETCH_USER_SUCCESS} from './admin.types';

export const adminUserCreateSuccess= (payload)=> {
    return {
        type:ADMIN_USER_CREATE_SUCCESS,
        payload: payload
    }
}

export const userUpdateSuccess= (payload)=> {
    return {
        type:USER_UPDATE_SUCCESS,
        payload: payload
    }
}

export const fetchUserSuccess= (payload)=> {
    return {
        type:FETCH_USER_SUCCESS,
        payload: payload
    }
}