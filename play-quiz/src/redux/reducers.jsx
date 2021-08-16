//En este fichero implementamos la logica de nuestra app
import axios from 'axios'
import {combineReducers} from 'redux'
import {CHECK_QUIZ} from './actions'

function score(state = 0, action = {}){
    switch(action.type){
        default:
            return state;
    }
}

function finished(state = false, action = {}){
    switch(action.type){
        default:
            return state;
    }
}

function currentQuestion(state = 0, action = {}){
    switch(action.type){
        
        default:
            return state;
    }
}

function check(state = false, action = {}){
    switch(action.type){
        case CHECK_QUIZ:
            axios.get('/quiz/started/'+action.payload.accessId)
            .then(res => {
            console.log(res.data)
                if(res.data){
                    return true
                }if(!res.data){
                    return false
                }
            })
        default:
            return state;
    }
}

function quiz(state = {}, action = {}){
    switch(action.type){
        
        default:
            return state;
    }
}


const GlobalState = (combineReducers({
    score,
    finished,
    currentQuestion,
    check,
    quiz
  //  volver
}));

export default GlobalState