const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Moto = sequelize.define('Moto', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'motorista'  // define que todo moto é motorista
  }
}, {
  tableName: 'motos',  // importante definir o nome da tabela para ficar igual na FK
  timestamps: false,
});

module.exports = Moto;
