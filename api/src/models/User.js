const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
/*             validate: {
                is: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{,18}$/g,
            } */
        },
        givenName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        familyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
/*             validate: {
                is: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g,
            } */
        },
        photoURL: {
            type: DataTypes.STRING,
/*             validate: {
                isUrl: true
            } */
        },
        isAdmin: {
            type: DataTypes.STRING,
            defaultValue: false,
        }
    });
};