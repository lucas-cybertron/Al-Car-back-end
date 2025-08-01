const Moto = require('./moto');
const Carro = require('./carro');

// Um Moto tem muitos Carros
Moto.hasMany(Carro, { as: 'carros', foreignKey: 'motoId' });

// Um Carro pertence a um Moto
Carro.belongsTo(Moto, { as: 'moto', foreignKey: 'motoId' });

module.exports = { Moto, Carro };
