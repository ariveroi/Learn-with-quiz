import { Provider } from 'react-redux';

import history from '../history';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import store from './Store';
import React from 'react';
import Main from './Main';
import Game from './Game';


// if(localStorage.session){
//     let session = JSON.parse(localStorage.session);
//     store.dispatch(setUser(session.user))
// }
// // localStorage.clear();


export default class App extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        return(
            <Provider store={store}>
                <Router history={history}>
                    <Route exact path="/" component={Main}/>
                    <Route extact path="/game" component={Game}/>
                </Router>
                
            </Provider>
        );
    }
}
