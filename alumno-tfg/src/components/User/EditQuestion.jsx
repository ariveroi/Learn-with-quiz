import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuestion, editQuestion} from '../../actions/question_actions';

class EditQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            answer0: "",
            answer1: "",
            answer2: "",
            answer3: "",
            correct: 0,
            time: 0
        }
        this.edit = this.edit.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getQuestion(id)
        
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            question: nextProps.questions.pregunta.question,
            answer0: nextProps.questions.pregunta.answer0,
            answer1: nextProps.questions.pregunta.answer1,
            answer2: nextProps.questions.pregunta.answer2,
            answer3: nextProps.questions.pregunta.answer3,
            correct: nextProps.questions.pregunta.correctAnswer,
            time: nextProps.questions.pregunta.time
        })
    }

    edit(e){
        e.preventDefault();
        const id = this.props.match.params.id;
        const question = this.state
        this.props.editQuestion(id, question, this.props.history) 
    }
    render() {
        return(
            <div className="container w-80">
                <div>Edit Question</div>
                <form className="standar-form" onSubmit={this.edit}>
                    <div className="form-group">
                        <label>Question:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({question: e.target.value})} value={this.state.question}/>
                    </div>
                    <div className="form-group">
                        <label>Correct Answer:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({answer0: e.target.value})} value={this.state.answer0}/>
                    </div>
                    <div className="form-group">
                        <label>Answer 2:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({answer1: e.target.value})} value={this.state.answer1}/>
                    </div>
                    <div className="form-group">
                        <label>Answer 3:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({answer2: e.target.value})} value={this.state.answer2}/>
                        
                    </div>
                    <div className="form-group">
                        <label>Answer 4:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({answer3: e.target.value})} value={this.state.answer3}/>
                    </div>
                    <div className="form-group">
                        <label>Correcta:</label>
                        <select className="form-control" onChange={(e) => this.setState({correct: e.target.value})} value={this.state.correct}>
                            <option value="0">1</option>
                            <option value="1">2</option>
                            <option value="2">3</option>
                            <option value="3">4</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Time:</label>
                        <input type="number" className="form-control" onChange={(e) => this.setState({time: e.target.value})} value={this.state.time}/>
                    </div>
                    {/* <input type="number" onChange={(e) => this.setState({correct: e.target.value})} value={this.state.correct}/> */}
                    <button type="submit" className="btn btn-dark" value="Edit"><i className="fas fa-edit"></i> Edit</button>
                </form>
            </div>

        );
    }
}


EditQuestion.propTypes = {
    getQuestion: PropTypes.func.isRequired,
    editQuestion: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {getQuestion, editQuestion})(withRouter(EditQuestion));