var express = require('express');
var router = express.Router();
// const multer = require('multer')
// const multerConfig = {
//     storage: memory.diskStorage({
//         destination: (req, file, next) => {
//             next(null, './public/images')
//         },
//         filename: (req, file, next) => {
//             console.log(file)
//         }
//     }),
    
// }

const sessionController = require("../controllers/session");
const userController = require("../controllers/user");
const quizController = require("../controllers/quiz");
const preguntaController = require("../controllers/pregunta");
const alumnoController = require("../controllers/alumno");

router.all('*', sessionController.deleteExpiredUserSession);

//-----------------------------------------------------------

router.all('*',sessionController.deleteExpiredUserSession);

//-----------------------------------------------------------

//DESDE EL LADO DEL PROFESOR
//Rutas para Login y Logout
router.post('/login', sessionController.create);
router.delete('/logout', sessionController.destroy);

//edit user
router.get('/:id(\\d+)/edit', userController.viewUser);

//Rutas relacionadas con usuario
router.post('/admin/create', userController.createUser);
router.get('/admin/index', userController.index);
router.get('/admin/view/:id(\\d+)',sessionController.adminOrMyselfRequired, userController.viewUser);
router.get('/edit/:id(\\d+)', userController.editUser);
router.put('/edit/:id(\\d+)', userController.edit);
router.delete('/admin/delete/:id(\\d+)', userController.deleteUser);


//Rutas relacionadas con un quiz
router.post('/create/quiz', quizController.createQuiz);
router.get('/view/quizzes/:id(\\d+)', quizController.index);
router.get('/quiz/:id(\\d+)/view', quizController.viewQuiz);
router.delete('/quiz/:id(\\d+)/delete', quizController.deleteQuiz);
router.put('/quiz/start/:id(\\d+)', quizController.startQuiz);
router.put('/quiz/end/:id(\\d+)', quizController.endQuiz);


//Rutas reacionadas con preguntas
router.post('/new/question/:id(\\d+)', preguntaController.newQuestion);
router.get('/get/question/:id(\\d+)', preguntaController.getQuestion);
router.delete('/quiz/:quizId(\\d+)/delete/question/:id(\\d+)', preguntaController.deleteQuestion);
router.put('/edit/question/:id(\\d+)', preguntaController.editQuestion);
router.put('/question/end', preguntaController.endQuestion);
router.get('/question/:id(\\d+)/answer/:quizId(\\d+)', preguntaController.getAnswer);


//-----------------------------------------------------------
//DESDE EL LADO DEL ALUMNO

//Rutas relacionadas con el quiz
router.get('/quiz/check/:accessId(\\d+)', quizController.checkQuiz);

//Rutas relacionadas con el alumno
router.post('/alumno/join', alumnoController.joinQuiz);
router.get('/alumno/check/:id(\\d+)', alumnoController.checkStarted);
router.put('/alumno/answer', alumnoController.score);
//routes for /user
// router.get('/user/:id(\\d+)', userController.viewUser);




// //rooutes for /quiz


// //routes for /question
// router.get('/quiz/:id(\\d+)/questions', preguntaController.index);






//routes for /alumno

// router.put('/alumno/answer', alumnoController.putScore)

module.exports = router;
