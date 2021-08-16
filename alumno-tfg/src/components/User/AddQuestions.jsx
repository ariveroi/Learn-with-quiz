import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

import {connect} from 'react-redux';

import {newQuestion} from '../../actions/question_actions';

import '../../styles/General.css'

class AddQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            question: "",
            answer0: "",
            answer1: "",
            answer2: "",
            answer3: "",
            correct: 0,
            time: 0,
            imageSrc: "",
            image: {}
        }
        this.addQuestion = this.addQuestion.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    addQuestion(e){
        e.preventDefault();
        const question = this.state
        this.props.newQuestion(this.props.quiz.quiz.id, question, this.props.history)  
    }

    onDrop(e){
        e.preventDefault();
        this.onFileChange(e, e.dataTransfer.files[0]);
    }

    onFileChange(e, file){
        var file = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();
             
        if (!file.type.match(pattern)) {
            alert('Formato inválido');
            return;
        }
         
        reader.onload = (e) => {
            this.setState({ 
                imageSrc: reader.result
            }); 
        }
        reader.readAsDataURL(file);
        // this.setState({
        //     image: imageSrc
        // })
        // console.log(file)
    }

    render() {
        // const numberQuestions = this.props.quiz.quiz.questionNumber;
        return(
            <div className="container w-80">
                <div>Add Question</div>
                <form className="standar-form" onSubmit={this.addQuestion}>
                    <div className="form-group">
                        <label>Question:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({question: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Answer 1:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({answer0: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Answer 2:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({answer1: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Answer 3:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({answer2: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Answer 4:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({answer3: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Correcta:</label>
                        <select className="form-control" onChange={(e) => this.setState({correct: e.target.value})}>
                            <option value="0" >1</option>
                            <option value="1" >2</option>
                            <option value="2" >3</option>
                            <option value="3" >4</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Time:</label>
                        <input type="number" className="form-control" onChange={(e) => this.setState({time: e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-dark"><i className="fas fa-plus-circle"></i> Add</button>
                    <label onDrop={this.onDrop} >
                        <input type="file" accept="image/*" className="btn btn-dark m-2" onChange={this.onFileChange}/>
                        <img src={this.state.imageSrc}/>
                    </label>
                    
                    {/* <input type="submit" className="btn btn-dark" value="Add"/> */}
                </form>
            </div>

        );
    }
}


AddQuestion.propTypes = {
    newQuestion: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    quiz: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {newQuestion})(withRouter(AddQuestion));