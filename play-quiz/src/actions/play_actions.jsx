import axios from 'axios'

import {CHECK_QUIZ_TRUE, CHECK_QUIZ_FALSE, QUIZ_STARTED, JOIN_QUIZ} from './constants'

export const checkQuiz = (accessId) => dispatch => {
    axios.get('/quiz/check/'+accessId)
    .then(res => {
        if(!res.data){
            dispatch(noQuiz()) 
        }else{
            dispatch(quiz())
        }
    })
}

const noQuiz = () => {
    return {
        type: CHECK_QUIZ_FALSE,
        payload: "El quiz introducido no está disponible"
    }
}

const quiz = () => {
    return {
        type: CHECK_QUIZ_TRUE,
        payload: true
    }
}

export const joinQuiz = (request, history) => dispatch => {
    const accessId = request.accessId;
    const user = request.nickname;
    axios.post('/alumno/join', {accessId, user})
    .then(res => {
        console.log("Joined");
        dispatch(join(user, accessId))
        history.push('/game')
    })
}

const join = (user, accessId) => {
    return{
        type: JOIN_QUIZ,
        payload: {user, accessId}
    }
}

export const checkStarted = id => dispatch => {
    axios.get('/alumno/check/'+id)
    .then(res => {
        if(res.data){
            dispatch(started())
        }
    })
}

const started = () => {
    return {
        type: QUIZ_STARTED,
        payload: true
    }
}
