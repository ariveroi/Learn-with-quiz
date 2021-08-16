import React from 'react';
//import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
//import axios from 'axios';
import {withRouter, Link, Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuiz} from '../../actions/quiz_actions'
import {endQuestion} from '../../actions/question_actions'

class Results extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quiz: {}
        }
    }

    componentDidMount(){
        const id = this.props.quizId
        this.props.getQuiz(id)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            quiz: nextProps.quiz.quiz
        })
    }

    

    render() {
        console.log(this.state)
        const alumnos = this.state.quiz.alumnos
        if(alumnos != undefined){
            for (var i = 0; i<alumnos.length-1; i++){
                for (var j = 0; j < alumnos.length - i - 1; j++){
                    if(alumnos[j].score < alumnos[j+1].score){
                        var aux = alumnos[j]
                        alumnos[j] = alumnos[j+1]
                        alumnos[j+1] = aux
                    }               
                }
            }
            return(
                <div className="container">
                    <h1>Results</h1>
                    <div className="text-field-principal">Question ended</div>
                    <div className="row">
                        <div className="text-field-principal col-12">Clasificación</div>
                        <table className="table">
                            <tbody>
                            <tr>
                                <td className="podium-td"><div id="podium1">{alumnos[1].username || ""}</div></td>
                                <td className="podium-td"><div id="podium0">{alumnos[0].username || ""}</div></td>
                                <td className="podium-td"><div id="podium2">{alumnos[2].username || ""}</div></td>
                            </tr>
                            </tbody>
                        </table> 
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="">
                    Loading 
                </div>
    
            );
        }  
    }
}


Results.propTypes = {
    getQuiz: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    quiz: state.quiz
});

export default connect(mapStateToProps, {getQuiz})(withRouter(Results));