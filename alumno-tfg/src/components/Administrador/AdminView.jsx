import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import '../../styles/General.css'


class AdminView extends React.Component {
    constructor(props){
        super(props);
    }


    render() {
        let editLink = "/edit/"+this.props.login.user.id;
        return(
            <div className="container w-80 mt-5">
                <div className="admin-navbar row text-center">
                    <Link to={editLink} className="link col-sm-3 col-12 m-auto">Edit User</Link>
                    <Link to="/admin/new" className="link col-sm-3 col-12 m-auto">Create User</Link>
                    <Link to="/users" className="link col-sm-3 col-12 m-auto">View Users</Link>
                </div>
            </div>

        );
    }
}


AdminView.propTypes = {
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AdminView));