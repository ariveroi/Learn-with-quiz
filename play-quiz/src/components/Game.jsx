import React from 'react';

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom';
import io from 'socket.io-client'
import {checkStarted} from '../actions/play_actions'

import square from '../assets/square.svg'
import diamond from '../assets/diamond.svg'
import circle from '../assets/circle.svg'
import triangle from '../assets/triangle.svg'

class Game extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          started: false,
          currentQuestion: 0,
          answerSub: false,
          questionEnd: false,
          quizEnd: false,
          answer: 0
      } 
      this.onAnswer = this.onAnswer.bind(this)
      this.end = this.end.bind(this)
  }

  componentDidMount(){
    //   this.setState({
    //       quiz: this.props.play.quiz
    //   })
        this.setState({
            started:false,
            
        })
      this.socket = io('/')
      this.socket.on('quiz-started', () => {
          this.setState({
                started: true
          })
      })
      this.socket.on('end-question', () => {
          this.setState({
              questionEnd: true
          })
      })
      this.socket.on('next-question', () => {
          this.setState({
              currentQuestion: this.state.currentQuestion + 1,
              questionEnd: false,
              answerSub: false
          })
      })
      this.socket.on('end-quiz', () => {
          this.setState({
              quizEnd: true,
              quiz: {},
              started: false
          })
      })
  }

  onAnswer(num, e){
      e.preventDefault()
      this.setState({
          answerSub: true
      })
      console.log(num)
      this.socket.emit('answer-submit', {answer: num, user: this.props.play.user})
  }

  end(){
      this.props.history.push('/')
  }

  render() {
    return(
        <div>
            {
                !this.state.started && !this.state.questionEnd && !this.state.quizEnd
                ?
                <div className="container w-50">
                    <h1>Game Screen</h1>
                    <div>Waiting to start...</div>
                </div>
                :
                this.state.started && !this.state.answerSub && !this.state.questionEnd
                ?
                <div className="container">
                    <h1>Quiz Screen</h1>
                    {/* <div>{this.state.quiz.pregunta[this.state.currentQuestion].question}</div> */}
                    <div className="row">
                        <button onClick={(e) => this.onAnswer(0, e)} className="col-12 col-sm-5 m-auto respuestas" id="respuesta-0"><img src={diamond}/></button>
                        <button onClick={(e) => this.onAnswer(1, e)} className="col-12 col-sm-5 m-auto respuestas" id="respuesta-1"><img src={triangle}/></button>
                        <button onClick={(e) => this.onAnswer(2, e)} className="col-12 col-sm-5 m-auto respuestas" id="respuesta-2"><img src={square}/></button>
                        <button onClick={(e) => this.onAnswer(3, e)} className="col-12 col-sm-5 m-auto respuestas" id="respuesta-3"><img src={circle}/></button>
                    </div>
                </div>
                :
                this.state.started && this.state.answerSub && !this.state.questionEnd
                ?
                <div className="container standar-form">
                    <h1>Did u answer too fast?</h1>
                </div>
                :
                this.state.started && this.state.questionEnd
                ?
                <div className="container standar-form">
                    <h1>Question Ended</h1>
                </div>
                :
                this.state.quizEnd
                ?
                <div className="container standar-form">
                    <h1>Quiz Ended</h1>
                    {/* <div>{this.state.quiz.pregunta[this.state.currentQuestion].question}</div> */}
                    <button className="btn btn-dark" onClick={this.end}>End</button>
                </div>
                :
                <div>
                    <h1>Mal</h1>
                </div>
            }
            

        </div>
    )
      
  }
}

Game.propTypes = {
    checkStarted: PropTypes.func.isRequired,
    // submitAnswer: PropTypes.func.isRequired,
    play: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    play: state.play
});
  
export default connect(mapStateToProps, {checkStarted})(withRouter(Game));