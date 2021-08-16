import {combineReducers} from 'redux'

import playReducer from './play_reducer'

const GlobalState = (combineReducers({
    play: playReducer
}))

export default GlobalState;