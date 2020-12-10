const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
      Categories:{
     type: DataTypes.ARRAY(DataTypes.DECIMAL),
     allowNull:true
    },
    stock: {
     type:  DataTypes.INTEGER,
     allowNull: false
    },
    img:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        isUrl: true
      }
    
    }
  });
};
