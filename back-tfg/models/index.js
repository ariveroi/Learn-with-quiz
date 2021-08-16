const path = require('path');

// Load ORM
const Sequelize = require('sequelize');

// To use SQLite data base:
//    DATABASE_URL = sqlite:quiz.sqlite
// To use  Heroku Postgres data base:
//    DATABASE_URL = postgres://user:passwd@host:port/database

const url = process.env.DATABASE_URL || "sqlite:kahoot.sqlite";

const sequelize = new Sequelize(url);

// Import the definition of the Quiz Table from quiz.js
sequelize.import(path.join(__dirname, 'pregunta'));

sequelize.import(path.join(__dirname, 'quiz'));

// Import the definition of the Tips Table from tip.js
//sequelize.import(path.join(__dirname,'quiz'));

// Import the definition of the Users Table from user.js
sequelize.import(path.join(__dirname,'user'));

// Session
sequelize.import(path.join(__dirname,'session'));

//Alumno
sequelize.import(path.join(__dirname, 'alumno'));


// Relation between models

const {quiz, pregunta, user, alumno} = sequelize.models;

user.hasMany(quiz, {foreingKey: 'userId'});
quiz.belongsTo(user, {as: 'user', foreingKey: 'userId'});

pregunta.belongsTo(quiz, {as:'quiz', foreingKey: 'quizId'});
quiz.hasMany(pregunta, {foreingKey: 'quizId'});

quiz.hasMany(alumno, {foreingKey: 'quizId'});

// Relation 1-to-N between User and Quiz:
// quiz.belongsTo(user);
// user.hasMany(quiz);

//quiz.hasMany(user);


module.exports = sequelize;