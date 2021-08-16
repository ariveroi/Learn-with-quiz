import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {getUser, editUser} from '../../actions/user_actions';

class EditUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: ""
        }
        this.editUser = this.editUser.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getUser(id);
    }

    componentWillReceiveProps(nextProps){
        const user = nextProps.user.user;
        this.setState({
            username: user.username,
            password: user.password,
            email: user.email
        })
    }

    editUser(e){
        e.preventDefault();
        const id = this.props.match.params.id;
        const user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }
        this.props.editUser(user, id)
        if(this.props.login.user.isAdmin){
            this.props.history.push('/admin')
        }else{
            this.props.history.push('/user')
        }
    }
    render() {
        return(
            <div className="container">
                <div>Edit User</div>
                <form onSubmit={this.editUser}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({username: e.target.value})} value={this.state.username}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" onChange={(e) => this.setState({email: e.target.value})} value={this.state.email || ""}/>
                    </div>
                    <input type="submit" className="btn btn-dark" value="Editar"/>
                </form>
            </div>

        );
    }
}


EditUser.propTypes = {
    getUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    user: state.user,
    login: state.login
});

export default connect(mapStateToProps, {getUser, editUser})(withRouter(EditUser));