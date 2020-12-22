const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args:true              
            },
            // Permite solo los caracteres nombrados
             validate: {
                is: /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/,
            } 
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: {
                args:true,
                msg: 'Email address already in use!'
            },
            validate:{
                isEmail: true
            }
        },
        givenName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        familyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // Permite solo los caracteres nombrados
             validate: {
                is: /^[a-zA-Z0-9!@#$%\^&*)(+=._-]*$/g,
            } 
        },
        photoURL: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        isAdmin: {
            type: DataTypes.STRING,
            defaultValue: false
        }
    });
};