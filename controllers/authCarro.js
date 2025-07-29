// controllers/authCarro.js
const Carro = require('../models/carro');

const registrarCarro = async (req, res) => {
  try {
    console.log("📥 Requisição recebida para registrar carro.");
    console.log("📦 Dados recebidos:", req.body);

    const { modelo, placa, renavam, ano, cor, documento } = req.body;

    // Verificação básica
    if (!modelo || !placa || !renavam || !ano || !cor) {
      console.warn("⚠️ Dados incompletos recebidos.");
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    // Criação no banco
    const novoCarro = await Carro.create({
      modelo,
      placa,
      renavam,
      ano,
      cor,
      documento,
    });

    console.log("✅ Carro salvo com sucesso no banco:", novoCarro.toJSON());

    res.status(201).json({
      message: 'Carro cadastrado com sucesso!',
      carro: novoCarro,
    });

  } catch (error) {
    console.error('❌ Erro ao registrar carro:', error);
    res.status(500).json({
      message: 'Erro interno ao registrar carro.',
      error: error.message,
    });
  }
};

module.exports = {
  registrarCarro,
};
