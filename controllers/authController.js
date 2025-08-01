const User = require('../models/users');
const bcrypt = require('bcrypt');



exports.login = async (req, res) => {
  try {
    console.log('Recebido no login:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email e senha obrigatórios' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'usuário não encontrado' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(400).json({ message: 'email ou senha incorretos' });
    }

    return res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone || 'não informado',
        address: user.address || 'não informado',
        cpf: user.cpf || 'não informado'
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'erro interno no servidor' });
  }
};
