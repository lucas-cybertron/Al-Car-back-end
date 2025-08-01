const sequelize = require('../config/db');
const Moto = require('./moto');
const Carro = require('./carro');

// Associações
Moto.hasMany(Carro, { foreignKey: 'motoId', as: 'carros' });
Carro.belongsTo(Moto, { foreignKey: 'motoId', as: 'motorista' });

module.exports = {
  sequelize,
  Moto,
  Carro
};
