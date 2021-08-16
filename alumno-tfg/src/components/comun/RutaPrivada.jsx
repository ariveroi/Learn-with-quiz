import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const RutaPrivada = ({ component: Component, login, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            login.authenticated === true ? (<Component {...props} />
            ) : (
                    <Redirect to="/" />
                )
        }
    />

);

RutaPrivada.propTypes = {
    login: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    login: state.login
})

export default connect(mapStateToProps)(RutaPrivada);