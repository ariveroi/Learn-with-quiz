import React from 'react';

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom';

import {checkQuiz, joinQuiz} from '../actions/play_actions'

import io from 'socket.io-client'

import '../styles/General.css'

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            quiz: {},
            error: "",
            accessId: 0,
            checked: false,
            nickname: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitNickname = this.onSubmitNickname.bind(this);
    }

    componentDidMount(){
        this.socket = io('/')
        this.socket.on('quiz-started', e => {
            console.log('Quiz Started')
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            error: nextProps.play.error,
            checked: nextProps.play.checked
        })
    }

    onSubmit(e){
        e.preventDefault();
        const accessId = this.state.accessId;
        this.props.checkQuiz(accessId)
    }

    onSubmitNickname(e){
        e.preventDefault();
        const request = {
            nickname: this.state.nickname,
            accessId: this.state.accessId
        }
        this.props.joinQuiz(request, this.props.history)
        this.socket.emit('player-join')
        this.socket.emit('join-quiz')
    }

    render(){
        if(!this.state.checked){
            return(
                <div className="container">
                    <form className="standar-form" onSubmit={this.onSubmit}>
                        <div id="error">{this.state.error}</div>
                        <div className="form-group">
                            <label>Access Id:</label>
                            <input type="number" className="form-control" onChange={(e) => this.setState({accessId: e.target.value})}/>
                        </div>
                        <input className="btn btn-dark" type="submit" value="Go!"/>
                    </form>
                </div>
            )
        }else{
            return(
                <div className="container w-50">
                    <form className="standar-form" onSubmit={this.onSubmitNickname}>
                        <div className="form-group">
                            <label>Nickname: </label>
                            <input type="text" className="form-control" onChange={(e) => this.setState({nickname: e.target.value})}/>
                        </div>
                        <input className="btn btn-dark" type="submit" value="Join!"/>
                    </form>
                </div>
            )
        }
        
    }
}

Main.propTypes = {
    checkQuiz: PropTypes.func.isRequired,
    joinQuiz: PropTypes.func.isRequired,
    play: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    play: state.play
});
  
export default connect(mapStateToProps, {checkQuiz, joinQuiz})(withRouter(Main));