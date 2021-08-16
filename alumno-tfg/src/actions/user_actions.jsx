import axios from 'axios';
import {GET_USERS, GET_USER} from './constants';

export const newUser = user => dispatch => {
    const username = user.username;
    const password = user.password;
    const email = user.email;
    axios.post('/admin/create', {username, password, email})
    .then(res => {
        console.log("Created")
    })
}

export const getUsers = () => dispatch => {
    axios.get('/admin/index')
    .then(res => {
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    })
}

export const deleteUser = (id, history) => dispatch => {
    axios.delete('/admin/delete/'+id)
    .then(res => {
        console.log("Deleted")
        dispatch(getUsers())
    })
}

export const getUser = id => dispatch => {
    axios.get('/edit/'+id)
    .then(res => {
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    })
}

export const editUser = (user, id) => dispatch => {
    const username = user.username;
    const email = user.email;
    axios.put('/edit/'+id, {username,email})
    .then(res => {
        console.log("Edited")
        dispatch(getUser(id));
    })
}
