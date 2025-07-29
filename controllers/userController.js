const User = require('../models/users');
const bcrypt = require('bcrypt');

// Criar usuário
exports.createUser = async (req, res) => {
  try {
    const { name, phone, email, address, cpf, password } = req.body;

    if (!name || !phone || !email || !address || !cpf || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      phone,
      email,
      address,
      cpf,
      password: hashedPassword
    });


    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro interno do servidor.', error });
  }
};

// Listar todos os usuários
exports.listUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários.', error });
  }
};

// Listar usuário por ID
exports.listUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário.', error });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const { name, phone, email, address, cpf, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    // Se senha enviada, criptografa antes de atualizar
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }

    await user.update(req.body);
    res.json({ message: 'Usuário atualizado com sucesso.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário.', error });
  }
};

// Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

    await user.destroy();
    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário.', error });
  }
};
