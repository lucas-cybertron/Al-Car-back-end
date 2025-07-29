const User = require('../models/users');  // importa o model users.js
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email e senha obrigatorios' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'usuario nao encontrado' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(400).json({ message: 'email ou senha incorretas' });
    }

    return res.json({
      message: 'Login realizado com sucesso',
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'erro interno no servidor' });
  }
};
