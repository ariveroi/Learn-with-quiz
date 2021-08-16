import React from 'react';

import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom';

import {connect} from 'react-redux';

import {getQuizzes, deleteQuiz} from '../../actions/quiz_actions'

class ViewQuizzes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quizzes: []
        }
        this.deleteQuizzes = this.deleteQuizzes.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getQuizzes(id);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            quizzes: nextProps.quiz.quizzes
        })
    }

    deleteQuizzes(id, e){
        this.props.deleteQuiz(id);
    }

    render() {
        const quizzes = this.state.quizzes
        const quizList = quizzes.map((quiz) => {
            const viewLink = '/view/quiz/'+quiz.id
            return(
                <tr key={quiz.id}>
                    <td>{quiz.name}</td>
                    <td><Link className="btn fas fa-eye" to={viewLink}></Link></td>
                    <td><button className="btn fas fa-trash-alt" onClick={(e) => this.deleteQuizzes(quiz.id, e)}></button></td>
                </tr>
                
            )
        });

        return(
            <div className="container">
                <div className="text-field-principal">Quizzes</div>
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th>Quiz</th>
                            <th>Ver</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizList}
                    </tbody>
                </table>
            </div>

        );
    }
}


ViewQuizzes.propTypes = {
    getQuizzes: PropTypes.func.isRequired,
    deleteQuiz: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    quiz: state.quiz,
    login: state.login
});

export default connect(mapStateToProps, {getQuizzes, deleteQuiz})(withRouter(ViewQuizzes));