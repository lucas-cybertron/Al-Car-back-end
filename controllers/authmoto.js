const Moto = require('../models/moto');
const Carro = require('../models/carro'); // importe o modelo Carro
const bcrypt = require('bcrypt');

// Criar motorista
exports.createMoto = async (req, res) => {
  try {
    console.log('📥 Dados recebidos:', req.body);

    const { name, phone, email, address, cpf, password } = req.body;

    if (!name || !phone || !email || !address || !cpf || !password) {
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

    const { password: _, ...motoSemSenha } = newMoto.toJSON();
    res.status(201).json({ message: 'Motorista cadastrado com sucesso!', moto: motoSemSenha });

  } catch (error) {
    console.error('❌ Erro ao criar motorista:', error);
    res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
};

// Login do motorista
exports.loginMoto = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const moto = await Moto.findOne({ where: { email } });

    if (!moto) {
      return res.status(404).json({ message: 'Motorista não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(password, moto.password);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    const { password: _, ...motoSemSenha } = moto.toJSON();
    res.status(200).json({ message: 'Login realizado com sucesso.', user: motoSemSenha });

  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ message: 'Erro ao realizar login.', error: error.message });
  }
};

// Listar todos os motoristas
exports.listMotos = async (req, res) => {
  try {
    const motos = await Moto.findAll();
    res.json(motos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar motoristas.', error });
  }
};

// Buscar motorista por ID
exports.listMotoById = async (req, res) => {
  try {
    const moto = await Moto.findByPk(req.params.id);
    if (!moto) return res.status(404).json({ message: 'Motorista não encontrado.' });
    res.json(moto);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar motorista.', error });
  }
};

// Buscar motorista com carro associado (nova função)
exports.getMotoWithCarro = async (req, res) => {
  try {
    const id = req.params.id;

    const moto = await Moto.findByPk(id, {
      include: [{
        model: Carro,
        as: 'carro' // use o alias que você definiu no relacionamento
      }]
    });

    if (!moto) return res.status(404).json({ message: 'Motorista não encontrado.' });

    const { password, ...motoSemSenha } = moto.toJSON();
    res.json(motoSemSenha);

  } catch (error) {
    console.error('Erro ao buscar motorista com carro:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

// Atualizar motorista
exports.updateMoto = async (req, res) => {
  try {
    const moto = await Moto.findByPk(req.params.id);
    if (!moto) return res.status(404).json({ message: 'Motorista não encontrado.' });

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    await moto.update(req.body);
    const { password: _, ...motoSemSenha } = moto.toJSON();
    res.json({ message: 'Motorista atualizado com sucesso.', moto: motoSemSenha });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar motorista.', error });
  }
};

// Deletar motorista
exports.deleteMoto = async (req, res) => {
  try {
    const moto = await Moto.findByPk(req.params.id);
    if (!moto) return res.status(404).json({ message: 'Motorista não encontrado.' });

    await moto.destroy();
    res.json({ message: 'Motorista deletado com sucesso.' });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar motorista.', error });
  }
};
