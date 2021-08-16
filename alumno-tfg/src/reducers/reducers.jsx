import {combineReducers} from 'redux';
import loginReducer from './login_reducer'
import userReducer from './user_reducer'
import quizReducer from './quiz_reducer'
import questionReducer from './pregunta_reducer'
import playReducer from './play_reducer'

const GlobalState = (combineReducers({
    login: loginReducer,
    user: userReducer,
    quiz: quizReducer,
    questions: questionReducer,
    play: playReducer
}))

export default GlobalState;