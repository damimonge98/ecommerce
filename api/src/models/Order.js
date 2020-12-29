const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('order', {
        state: {
            type: DataTypes.ENUM,
            values: ['carrito', 'creada', 'procesando', 'cancelada', 'completada']
        },
        total: {
            type: DataTypes.DOUBLE,
            allowNull:false
        }
    })
}