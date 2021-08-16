module.exports = function (sequelize, DataTypes) {
    return sequelize.define('quiz',
        {   
            accessId: {
                type: DataTypes.INTEGER,
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                validate: {notEmpty: {msg: "Name must not be empty."}}
            },
            started: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            currentQuestion: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        });
};