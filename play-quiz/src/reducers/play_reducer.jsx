import {CHECK_QUIZ_TRUE, CHECK_QUIZ_FALSE, QUIZ_STARTED, JOIN_QUIZ} from '../actions/constants'

const initialState = {
    user: "",
    error: "",
    accessId: 0,
    checked: false,
    started: false
}

export default function(state = initialState, action){
    switch(action.type){
        case CHECK_QUIZ_TRUE:
            return {
                ...state,
                checked: true
            }
        case CHECK_QUIZ_FALSE:
            return {
                ...state,
                error: action.payload
            }
        case QUIZ_STARTED:
            return {
                ...state,
                started: true
            }
        case JOIN_QUIZ:
            return {
                ...state,
                user: action.payload.user,
                accessId: action.payload.accessId
            }
        default:
            return state
    }
}