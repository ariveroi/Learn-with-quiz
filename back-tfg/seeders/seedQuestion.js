'use strict';


module.exports = {
    up(queryInterface, Sequelize) {

        return queryInterface.bulkInsert('pregunta', [
            {
                question: 'admin',
                answer0: 'admin',
                answer1: 'admin',
                answer2: 'admin',
                answer3: 'admin',
                correctAnswer: 2,
                quizId: 1,
                createdAt: new Date(), updatedAt: new Date()
            },
            {
                question: 'admin2',
                answer0: 'admin',
                answer1: 'admin',
                answer2: 'admin',
                answer3: 'admin',
                correctAnswer: 1,
                quizId: 1,
                createdAt: new Date(), updatedAt: new Date()
            }
        ]);
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('pregunta', null, {});
    }
};