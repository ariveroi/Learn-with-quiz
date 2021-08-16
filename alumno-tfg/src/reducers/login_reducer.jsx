import {SET_USER} from '../actions/constants';
import isEmpty from '../validation/isEmpty';

const intialState = {
    authenticated: false,
    user: {}
}

export default function(state = intialState, action){
    switch(action.type){
        case SET_USER:
            return {
                ...state,
                authenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}