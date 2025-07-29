const Moto = require('../models/moto');
const bcrypt = require('bcrypt');

// Criar moto
exports.createMoto = async (req, res) => {
  try {
    console.log('📥 Dados recebidos no backend:', req.body);

    const { name, phone, email, address, cpf, password } = req.body;

    if (!name || !phone || !email || !address || !cpf || !password) {
      console.warn('⚠️ Campos obrigatórios faltando');
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMoto = await Moto.create({
      name,
      phone,
      email,
      address,
      cpf,
      password: hashedPassword
    });

    console.log('✅ Motorista criada com sucesso:', newMoto.toJSON());

    res.status(201).json({ message: 'Motrista cadastrada com sucesso!', moto: newMoto });
  } catch (error) {
    console.error('❌ Erro ao criar motorista:', error);
    res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
};

// Listar todas motos
exports.listMotos = async (req, res) => {
  try {
    const motos = await Moto.findAll();
    res.json(motos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar motorista.', error });
  }
};

// Listar moto por ID
exports.listMotoById = async (req, res) => {
  try {
    const moto = await Moto.findByPk(req.params.id);
    if (!moto) return res.status(404).json({ message: 'Motorista não encontrada.' });
    res.json(moto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar motorista.', error });
  }
};

// Atualizar moto
exports.updateMoto = async (req, res) => {
  try {
    const { password } = req.body;
    const moto = await Moto.findByPk(req.params.id);
    if (!moto) return res.status(404).json({ message: 'Motorista não encontrada.' });

    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    await moto.update(req.body);
    res.json({ message: 'Motorista atualizada com sucesso.', moto });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar motorista.', error });
  }
};

// Deletar moto
exports.deleteMoto = async (req, res) => {
  try {
    const moto = await Moto.findByPk(req.params.id);
    if (!moto) return res.status(404).json({ message: 'Motorista não encontrada.' });

    await moto.destroy();
    res.json({ message: 'Motorista deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar motorista.', error });
  }
};
