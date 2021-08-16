import React from 'react';
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {createQuiz} from '../../actions/quiz_actions'


class CreateQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quiz: "",
            owner: ""
        }
        this.createQuiz = this.createQuiz.bind(this)
    }

    componentDidMount(){
        this.setState({
            owner: this.props.login.user.id
        })
    }

    createQuiz(e){
        e.preventDefault();
        const quizName = this.state.quiz;
        const owner = this.state.owner;
        this.props.createQuiz(quizName, owner, this.props.history)
        
    }

    render() {
        
        return(
            <div className="container">
                <div>Create Quiz</div>
                <form className="standar-form" onSubmit={this.createQuiz}>
                    <div className="form-group">
                        <label>Quiz name: </label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({quiz: e.target.value})}/>
                    </div>
                    <input type="submit" className="btn btn-dark" value="Create"/>
                </form>
            </div>
           
                
            
        );
    }
}


CreateQuiz.propTypes = {
    createQuiz: PropTypes.func.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    quiz: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {createQuiz})(withRouter(CreateQuiz));