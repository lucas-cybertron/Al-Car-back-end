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
  motoId: {  // FK para o motorista
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'motos', // nome da tabela motos, importante
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  }
}, {
  tableName: 'carros',
  timestamps: false,
});

module.exports = Carro;
