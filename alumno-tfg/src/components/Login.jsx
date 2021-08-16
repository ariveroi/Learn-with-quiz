import React, {Component} from 'react';
import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter} from 'react-router-dom';

//import {Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import {loginUser} from '../actions/login_action';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      isAdmin: false,
      isUser: false,
      errors: {}
    }
    this.login = this.login.bind(this)
  }

  componentDidMount(){
    if(this.props.login.authenticated){
        let session = JSON.parse(localStorage.session);
        if(this.props.login.user.isAdmin){
            this.props.history.push('/admin')
        }else{
            this.props.history.push('/user')
        }
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.login.authenticated){
        let session = JSON.parse(localStorage.session);
        console.log("Mi usuarios", session.user)
        if(session.user.isAdmin){
            this.props.history.push('/admin')
        }
        else{
            this.props.history.push('/user')
        }
    }
  }

  login(e){
    e.preventDefault()
    const user = {
        username: this.state.username,
        password: this.state.password
    };
    this.props.loginUser(user)
  }
  

  render(){
    return (
      <div className="container">
      <form className="standar-form" onSubmit={this.login}>
        <div className="form-group">
          <label><i className="fas fa-user"></i> Username:</label>
          <input type="text" className="form-control" onChange={(e) => this.setState({username: e.target.value})}/>
        </div>
        <div className="form-group">
          <label><i className="fas fa-key"></i> Password:</label>
          <input type="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})}/>
        </div>
        
        <input type="submit" className="btn btn-dark" value="Login"/>
      </form>
        
      </div>
      
    )
  }

}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps, {loginUser})(withRouter(Login));