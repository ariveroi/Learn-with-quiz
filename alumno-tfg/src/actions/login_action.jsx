import axios from 'axios';

import {SET_USER} from './constants'


//Action que se ejecuta al hacer login
export const loginUser = user => dispatch => {
    let username = user.username;
    let password = user.password;
    
    axios.post('/login', {username, password})
    .then(res => {
        const session = {
            
            user: {
                username: res.data.username,
                isAdmin: res.data.isAdmin,
                id: res.data.id
            }
            
        }
        localStorage.setItem("session", JSON.stringify(session))
        dispatch(setUser(session.user));
    })
}

export const setUser = user => {
    if(user.username === undefined){
        return {
            type: SET_USER,
            payload: {}
        }
        
    }
    return {
        type: SET_USER,
        payload: user
    }
    
    
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('session');
    dispatch(setUser({}));
}