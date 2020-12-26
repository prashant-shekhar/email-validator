import {ADMIN_USER_CREATE_SUCCESS, USER_UPDATE_SUCCESS, FETCH_USER_SUCCESS} from './admin.types';

const INITIAL_STATE={
    users: [],
}

const adminReducer= (state=INITIAL_STATE, action) =>{
    switch(action.type){
        case USER_UPDATE_SUCCESS:
            return {
                users: [...state.users]
            }
        case FETCH_USER_SUCCESS:
            return {
                users: action.payload
            }
        default: 
            return state

    }
}

export default adminReducer;