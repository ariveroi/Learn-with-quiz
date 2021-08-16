import {GET_USERS, GET_USER, DELETE_USER, SET_USERS} from '../actions/constants';

const intialState = {
    user: {},
    users: [],
    deleted: false
}

export default function(state = intialState, action){
    switch(action.type){
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state;
    }
}