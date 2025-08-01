const Carro = require('../models/carro');

const registrarCarro = async (req, res) => {
  try {
    console.log("📥 Requisição recebida para registrar carro.");
    console.log("📦 Dados recebidos:", req.body);

    const { modelo, placa, renavam, ano, cor, documento, motoId } = req.body;

    // Verificação básica, incluindo motoId
    if (!modelo || !placa || !renavam || !ano || !cor || !motoId) {
      console.warn("⚠️ Dados incompletos recebidos.");
      return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios, incluindo motoId.' });
    }

    // Criação no banco
    const novoCarro = await Carro.create({
      modelo,
      placa,
      renavam,
      ano,
      cor,
      documento,
      motoId,   // vinculando o carro ao motorista pelo ID
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
