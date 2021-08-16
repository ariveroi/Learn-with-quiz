import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import ReactToExcel from 'react-html-table-to-excel'
import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuiz} from '../../actions/quiz_actions'

class ViewAlumnos extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alumnos: []
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getQuiz(id);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            alumnos: nextProps.quiz.quiz.alumnos
        })
    }


    render() {
        const alumnos = this.state.alumnos
        const alumnosList = alumnos.map((alumno) => {
            console.log(alumno.createdAt)
            return(
                <tr key={alumno.id}>
                    <td >
                        {alumno.username}
                    </td>
                    <td className="d-none">
                        {alumno.createdAt}
                    </td>
                    <td className="text-right">
                        {alumno.score || 0}
                    </td>
                </tr>
                
                
            )
        });

        return(
            <div className="container">
                <table id="alumnos-table" className="table table-hover">
                    <thead>
                        <tr>
                            <th>Alumno</th>
                            <th className="d-none">Creado</th>
                            <th className="text-right">Puntuación</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {alumnosList}
                    </tbody>
                </table>
                <ReactToExcel
                    className="btn btn-dark"
                    table="alumnos-table"
                    filename={this.props.quiz.quiz.name}
                    sheet="sheet 1"
                    buttonText="Download"
                />
            </div>

        );
    }
}


ViewAlumnos.propTypes = {
    getQuiz: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    quiz: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {getQuiz})(withRouter(ViewAlumnos));