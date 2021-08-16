import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {logoutUser} from '../actions/login_action';


class Navbar extends Component {
    constructor(props){
        super(props);
      
        this.logout = this.logout.bind(this)
    }

    logout(){
        this.props.logoutUser();
    }

    render(){
        return(
            <div>
                {
                    this.props.login.authenticated && this.props.login.user.isAdmin
                    ?
                    <nav className="navbar bg-dark navbar-expand-sm justify-content-end">
                        <div className="navbar-nav mr-0">
                            <Link className="nav-link" to="/admin">{this.props.login.user.username}</Link>
                            <button className="btn btn-light nav-item" onClick={this.logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                        </div>
                    </nav>
                    :
                    this.props.login.authenticated && !this.props.login.user.isAdmin
                    ?
                    <nav className="navbar bg-dark navbar-expand-sm justify-content-end">
                        <div className="navbar-nav mr-0">
                            <Link className="nav-link" to="/user">User</Link>
                            <button className="btn btn-light nav-item" onClick={this.logout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                        </div>
                    </nav>
                    :
                    <div className="mainScreen">
                    </div>
                }
            </div>
            
            
        );
    }

}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    login: state.login
});

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));