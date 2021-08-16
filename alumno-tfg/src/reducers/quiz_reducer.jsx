import {SET_QUIZ, GET_QUIZZES, QUIZ_STARTED, SET_QUIZZES, SET_QUIZ_LOADING} from '../actions/constants';

const initialState = {
    quiz: {},
    quizzes: [],
    started: false,
    loading: true
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_QUIZ:
            return {
                ...state,
                quiz: action.payload,
                loading: false
            }
        case GET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload
            }
        case QUIZ_STARTED:
            return {
                ...state,
                strated: action.payload
            }
        case SET_QUIZZES:
            return {
                ...state,
                quizzes: action.payload
            }
        case SET_QUIZ_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}