import {SCORE} from '../actions/constants'

const initialState = {
    score: 0
}

export default function(state = initialState, action){
    switch(action.type){
        case SCORE:
            return {
                ...state,
                // score: action.payload
            }
        default:
            return state
    }
}