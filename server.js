require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Banco e Models com Associações
const { sequelize } = require('./models'); // <-- importa models/index.js com associações

// Rotas
const userRoutes = require('./routes/userRouter');     // <- Corrigido aqui
const contactRoutes = require('./routes/contactRouter');
const authRoutes = require('./routes/authRouter');
const carroRoutes = require('./routes/carroRouter');
const motoRoutes = require('./routes/motoRouter');

// Middlewares
app.use(express.json());
app.use(cors({
  origin: 'https://al-car-front-end.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Teste rápido
app.get('/', (req, res) => res.send('🚀 API funcionando!'));

// Rotas registradas
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/carro', carroRoutes);
app.use('/api/moto', motoRoutes);

// Porta
const PORT = process.env.PORT || 3000;

// Inicialização do banco e servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com o banco de dados estabelecida.');
    return sequelize.sync({ alter: true }); // ⚠️ 'alter' ajusta as tabelas sem apagar dados
  })
  .then(() => {
    console.log('📦 Banco de dados sincronizado com modelos.');
    app.listen(PORT, () =>
      console.log(`🟢 Servidor rodando na porta ${PORT}`)
    );
  })
  .catch((erro) =>
    console.error('❌ Erro ao conectar com o banco de dados:', erro)
  );
