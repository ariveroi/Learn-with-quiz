import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link, Redirect} from 'react-router-dom';
import io from 'socket.io-client'

import {connect} from 'react-redux';

import {getQuiz, startQuiz} from '../../actions/quiz_actions'

class PlayQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizName: "",
            accessId: 0,
            questions: [],
            alumnos: [],
            started: false,
            error: ""
        }
        //this.deleteQuizzes = this.deleteQuizzes.bind(this);
        this.start = this.start.bind(this)
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getQuiz(id);
        this.socket = io('/');
        this.socket.on('join-quiz', e => {
            console.log('Joined')
            this.props.getQuiz(id);
            this.setState({
                alumnos: this.props.quiz.quiz.alumnos
            })
        })
    }


    componentWillReceiveProps(nextProps){
        const id = this.props.match.params.id;
        this.setState({
            quizName: nextProps.quiz.quiz.name,
            accessId: nextProps.quiz.quiz.accessId,
            questions: nextProps.quiz.quiz.pregunta,
            alumnos: nextProps.quiz.quiz.alumnos
        })
        
    }

    start(){
        // const id = this.props.match.params.id;
        // const quiz = this.props.quiz.quiz;
        if(this.state.alumnos.length < 3){
            this.setState({
                error: "No hay suficientes participantes para empezar!"
            })
        }else{
            this.socket.emit('start-quiz')
            this.setState({
                started: true
            })  
        }
              
    }

    render() {
        const alumnos = this.state.alumnos;
        const alumnosList = alumnos.map((alumno) => {
            return(
                <div className="col-12 col-sm-4" key={alumno.id}>{alumno.username}</div>
            )
        })
        const redirLink = '/play/'+this.props.match.params.id
        return(
            
            <div>
                {
                    !this.state.started
                    ?
                    <div className="container w-80">
                        <h1>Quiz: {this.state.quizName}</h1>
                        <div id="play-header-view">
                            <div className="row text-center">
                                <h2 className="col-12">{this.state.accessId}</h2>
                                <div className="col-12 error">{this.state.error}</div>
                                <button className="col-2 btn btn-dark m-auto" onClick={this.start}><i className="fas fa-play-circle"></i> Start!</button>
                            </div>
                        </div>
                        <div className="row text-center" id="alumnos-list">
                            {alumnosList}
                        </div>
                        {/* <ul>{alumnosList}</ul> */}
                    </div>
                    :
                    <Redirect quiz={this.props.quiz.quiz} to={redirLink}/>
                }
            </div>
        )
    }
}


PlayQuiz.propTypes = {
    getQuiz: PropTypes.func.isRequired,
    startQuiz: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    questions: state.questions,
    quiz: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {getQuiz, startQuiz})(withRouter(PlayQuiz));