import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link, Redirect} from 'react-router-dom';
import io from 'socket.io-client'
import {connect} from 'react-redux';

import {getQuiz, endQuiz} from '../../actions/quiz_actions'
import {endQuestion, submitAnswer} from '../../actions/question_actions'
import Preguntas from './Preguntas';
import Results from './Results';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quiz: {},
            preguntas: [],
            currentQuestion: 0,
            end: false,
            tiempoTimer: 0,
            questionEnd: false,
            start: false
        }
        this.nextQuestion = this.nextQuestion.bind(this)
        this.endQuiz = this.endQuiz.bind(this)
        this.timer = setInterval(() =>{
            this.modifyTimer()
        }, 1000);
    }

    componentDidMount(){
        this.socket = io('/')
        this.props.getQuiz(this.props.match.params.id)
        this.setState({
            tiempoTimer: 15,
            start: true
        })
        this.socket.on('answer-submit', (data) => {
            const pregunta = {
                id: this.state.preguntas[this.state.currentQuestion].id,
                quizId: this.props.match.params.id,
                time: this.state.preguntas[this.state.currentQuestion].time
            }
            this.props.submitAnswer(data, pregunta)
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            quiz: nextProps.quiz.quiz,
            preguntas: nextProps.quiz.quiz.pregunta,
            // tiempoTimer: nextProps.quiz.quiz.pregunta[this.state.currentQuestion].time
        })
        if(this.state.preguntas.length > this.state.currentQuestion){
            this.setState({
                tiempoTimer: nextProps.quiz.quiz.pregunta[this.state.currentQuestion].time
            })
        }
        
    }

    modifyTimer(){
        if(!this.state.end && !this.state.questionEnd){
            this.setState({
                tiempoTimer: this.state.tiempoTimer - 1
            })
            if(this.state.tiempoTimer === 0){
                if(this.state.preguntas.length > this.state.currentQuestion){
                    this.props.endQuestion(this.state.quiz.id, this.state.preguntas[this.state.currentQuestion].id)
                    this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                        questionEnd: true
                    })
                    if(this.state.preguntas.length === this.state.currentQuestion){
                        this.setState({
                            end: true
                        })
                        this.socket.emit('end-quiz', this.state.quiz.accessId)
                    }
                    this.socket.emit('end-question', this.state.quiz.accessId)
                }
               
            }
        }
    }

    nextQuestion(){
        this.setState({
            // tiempoTimer: 15,
            questionEnd: false
        })
        if(this.state.preguntas.length > this.state.currentQuestion){
            this.setState({
                tiempoTimer: this.props.quiz.quiz.pregunta[this.state.currentQuestion].time
            })
        }
        this.socket.emit('next-question', this.state.quiz.accessId)
    }

    endQuiz(){
        this.props.endQuiz(this.state.quiz.id, this.props.history)
    }

    render() {
        if(!this.state.end && !this.state.questionEnd){
            return(
                <div className="container">
                    <h1>Tiempo restante: {this.state.tiempoTimer}</h1>
                    <Preguntas pregunta={this.state.preguntas[this.state.currentQuestion]}/>
                </div>
    
            );
        }if(this.state.questionEnd ||this.state.end){
            return(
                <div className="container justify-content-center">
                    <Results quizId={this.state.quiz.id} pregunta={this.state.preguntas[this.state.currentQuestion-1]} end={this.state.end}/>
                    {
                        !this.state.end 
                        ?
                        <button className="btn btn-dark" onClick={this.nextQuestion}>Next</button>
                        :
                        <button className="btn btn-dark" onClick={this.endQuiz}>End</button>
                    }
                </div>
            )
        }
        
        
    }
}


Game.propTypes = {
    submitAnswer: PropTypes.func.isRequired,
    endQuiz: PropTypes.func.isRequired,
    endQuestion: PropTypes.func.isRequired,
    getQuiz: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired,
    play: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    questions: state.questions,
    quiz: state.quiz,
    play: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {getQuiz, endQuestion, endQuiz, submitAnswer})(withRouter(Game));