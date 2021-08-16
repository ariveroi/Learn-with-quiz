import React from 'react';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import '../../styles/General.css'


class UserView extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const editLink = "/edit/"+this.props.login.user.id
        const quizzesLink = "/user/quizzes/"+this.props.login.user.id
        return(
            
            <div className="continer w-75 m-auto pt-5">
                <div className="row text-center">
                    <Link id="link1" to={editLink} className="link col-sm-3 col-12 m-auto">Edit User</Link>
                    <Link id="link2" to="/new/quiz" className="link col-sm-3 col-12 m-auto">Create Quiz</Link>
                    <Link id="link3" to={quizzesLink} className="link col-sm-3 col-12 m-auto">View Quizzes</Link>
                </div>
            </div>
           
                
            
        );
    }
}


UserView.propTypes = {
    login: PropTypes.object.isRequired,
    // errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  login: state.login,
//   errors: state.errors
});

export default connect(mapStateToProps)(withRouter(UserView));