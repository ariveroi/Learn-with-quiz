import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {getUsers, deleteUser} from '../../actions/user_actions';

class ViewUsers extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount(){
        this.props.getUsers()
        this.setState({
            users: this.props.user.users
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            users: nextProps.user.users
        })
    }

    deleteUser(id, e){
        console.log(id)
        this.props.deleteUser(id, this.props.history);
    }

    render() {
        const userList = this.state.users.map((user) => {
            const editLink = "/edit/"+user.id
            return(
                <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email || ""}</td>
                    {
                        !user.isAdmin
                        ?
                        <td><button className="btn fas fa-trash-alt" onClick={(e) => this.deleteUser(user.id, e)}></button></td>
                        :
                        <td></td>
                    }
                    <td><Link className="btn far fa-edit" to={editLink}></Link></td>
                </tr>
                
            )
        });

        return(
            <div className="container">
                <div>Users</div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Delete</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                </table>
            </div>

        );
    }
}


ViewUsers.propTypes = {
    getUsers: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {getUsers, deleteUser})(withRouter(ViewUsers));