const Sequelize = require("sequelize");
const {models} = require("../models");
const url = require('url');

exports.allowConections = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
}

exports.joinQuiz = (req, res, next) => {
    const {accessId, user} = req.body
    aId = parseInt(accessId)
    models.quiz.findOne({where: {accessId: aId}})
    .then(quiz => {
        
        const miAlumno = models.alumno.build({
            username: user,
            quizId: quiz.id
        })
        miAlumno.save()
        res.send(true)
    })
    .catch(error => next(error))
}

exports.checkStarted = (req, res, next) => {
    const id = req.params.id;
    models.quiz.findByPk(id)
    .then(quiz => {
        if(quiz.started){
            res.send(true)
        }else{
            res.send(false)
        }
    })
    .catch(error => next(error))
}

exports.score = (req, res, next) => {
    const {score, user, quizId} = req.body
    models.alumno.findOne({where: {username: user, quizId: quizId}})
    .then(alumno => {
        alumno.score += score
        alumno.save()
        res.send(true)
    })
    .catch(error => next(error))
}