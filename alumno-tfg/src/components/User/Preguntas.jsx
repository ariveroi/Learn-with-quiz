import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import {getQuiz} from '../../actions/quiz_actions'
import {endQuestion} from '../../actions/question_actions'
import Game from './Game';

import square from '../../assets/square.svg'
import diamond from '../../assets/diamond.svg'
import circle from '../../assets/circle.svg'
import triangle from '../../assets/triangle.svg'

import "../../App.css"

class Preguntas extends React.Component {
    constructor(props){
        super(props);
    }



    render() {
        console.log("Mi pregunta", this.props.pregunta)
        if(this.props.pregunta !== undefined){
            return(
                <div className="container">
                    <h2>{this.props.pregunta.question}</h2>
                    {/* <div id="timer">{this.state.tiempoTimer}</div> */}
                    <img src={this.props.pregunta.image} id="imagen-juego"/>
                    <div className="row">
                        <div className="col-12 respuestas" id="respuesta-0"><img src={diamond}/>{this.props.pregunta.answer0}</div>
                        <div className="col-12 respuestas" id="respuesta-1"><img src={triangle}/>{this.props.pregunta.answer1}</div>
                        <div className="col-12 respuestas" id="respuesta-2"><img src={square}/>{this.props.pregunta.answer2}</div>
                        <div className="col-12 respuestas" id="respuesta-3"><img src={circle}/>{this.props.pregunta.answer3}</div>
                    </div>
                </div>
            );
             
        }else{
            return(
                <div>
                    Loading
                </div>
            )
        }
        
        
    }
}


Preguntas.propTypes = {
    // quiz: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    // quiz: state.quiz
});

export default connect(mapStateToProps)(withRouter(Preguntas));