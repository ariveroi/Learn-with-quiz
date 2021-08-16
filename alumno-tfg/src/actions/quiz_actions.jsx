import axios from 'axios'
import {SET_QUIZ, GET_QUIZZES, QUIZ_STARTED, SET_QUIZZES, SET_QUIZ_LOADING} from './constants'
import {setQuestion, deleteQuestion, myScore} from './question_actions'

export const createQuiz = (quizName, ownerId, history) => dispatch => {
    axios.post('/create/quiz', {quizName, ownerId})
    .then(res => {
        const quiz = res.data
        dispatch(setQuiz(quiz))
        history.push('/view/quiz/'+quiz.id)
        console.log("Quiz created")
    })
}

export const setQuiz = quiz => dispatch => {
    dispatch( {
        type: SET_QUIZ,
        payload: quiz
    })
}

export const getQuizzes = id => dispatch => {
    axios.get('/view/quizzes/'+id)
    .then(res => {
        dispatch({
            type: GET_QUIZZES,
            payload: res.data
        })
    })
}

export const getQuiz = id => dispatch => {
    axios.get('/quiz/'+id+'/view')
    .then(res => {
        dispatch(setQuiz(res.data))
        dispatch(setQuestion(res.data.pregunta))
    })
}

export const deleteQuiz = id => dispatch => {
    axios.delete('/quiz/'+id+'/delete')
    .then(res => {
        console.log("Deleted")
        dispatch({
            type: SET_QUIZZES,
            payload: res.data
        })
    })
}

export const startQuiz = id => dispatch => {
    axios.put('/quiz/start/'+id)
    .then(res => {
        console.log("Quiz started")
    })
}

export const endQuiz = (id, history) => dispatch => {
    axios.put('/quiz/end/'+id)
    .then(res => {
        console.log("Quiz ended")
        dispatch(setQuiz(res.data))
        history.push('/view/quiz/'+id)
    })
}

export const setQuizLoading = () => dispatch => {
    dispatch({
        type: SET_QUIZ_LOADING,
        payload: true
    })
}