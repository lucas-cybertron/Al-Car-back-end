// models/carro.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Carro = sequelize.define('Carro', {
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  renavam: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  documento: {
    type: DataTypes.STRING, // pode ser URL de upload ou um ID
    allowNull: true,
  },
}, {
  tableName: 'carros',
  timestamps: false,
});

module.exports = Carro;
