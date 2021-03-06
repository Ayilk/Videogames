const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogames', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
      },      
    year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },    
    image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
  );
};