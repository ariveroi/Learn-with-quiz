// Definition of the Alumno model:

module.exports = function (sequelize, DataTypes) {
    const Alumno = sequelize.define('alumno', {
            username: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Username must not be empty."}},
                unique: true
            },
            score: {
                type: DataTypes.INTEGER
            }
        });

    return Alumno;
};