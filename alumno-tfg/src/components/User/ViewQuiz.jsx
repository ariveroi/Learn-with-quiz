import React from 'react';
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {getQuiz} from '../../actions/quiz_actions'
import {deleteQuestion} from '../../actions/question_actions'

class ViewQuiz extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            preguntas: [],
            imageSrc: ""
        }
        this.delQuestion = this.delQuestion.bind(this)
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        this.props.getQuiz(id);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            preguntas: nextProps.quiz.quiz.pregunta
        })
    }

    delQuestion(id,e){
        const quizId = this.props.match.params.id
        this.props.deleteQuestion(id, quizId);
    }

    render() {
        const pr = this.state.preguntas;
        console.log(this.state.preguntas)

        const preguntasList = pr.map((pregunta) => {
            const editLink = '/edit/question/'+pregunta.id;
            return(
                <tr key={pregunta.id}>
                    <td>{pregunta.question}</td>
                    <td>
                        <ol>
                            <li>{pregunta.answer0}</li>
                            <li>{pregunta.answer1}</li>
                            <li>{pregunta.answer2}</li>
                            <li>{pregunta.answer3}</li>
                        </ol>
                    </td>
                    <td className="text-center">{pregunta.correctAnswer+1}</td>
                    <td>{pregunta.time} segundos</td>
                    <td><Link className="btn far fa-edit" to={editLink}></Link></td>
                    <td><button className="btn fas fa-trash-alt" onClick={(e) => this.delQuestion(pregunta.id, e)}></button></td>
                    <td><img src={pregunta.image}/></td>
                </tr>
                
            )
        });
        const addLink = '/quiz/'+this.props.match.params.id+'/add'
        const playLink = '/quiz/'+this.props.match.params.id+'/play'
        const alumnosLink = '/quiz/'+this.props.match.params.id+'/alumnos'
        return(
            <div className="container w-80">
                <h1>Quiz: {this.props.quiz.quiz.name}</h1>
                <div className="sub-row row text-center">
                    <Link to={addLink} className="sub-link col-sm-3 col m-auto">Add Question</Link>
                    <Link to={playLink} className="sub-link col-sm-3 col m-auto">Play</Link>
                    <Link to={alumnosLink} className="sub-link col-sm-3 col m-auto">View Participants</Link>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Pregunta</th>
                            <th>Respuestas</th>
                            <th className="text-center">Respuesta Correcta</th>
                            <th>Tiempo</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preguntasList}
                    </tbody>
                </table>
               
            </div>

        );
    }
}

ViewQuiz.propTypes = {
    getQuiz: PropTypes.func.isRequired,
    deleteQuestion: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    questions: PropTypes.object.isRequired,
    quiz: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    match: state.match,
    questions: state.questions,
    quiz: state.quiz
});

export default connect(mapStateToProps, {getQuiz, deleteQuestion})(withRouter(ViewQuiz));