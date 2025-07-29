require('dotenv').config();
const sequelize = require('./config/db');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRouter');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const carroRoutes = require('./routes/carroRoutes'); // 👈 novo
const motoRoutes = require('./routes/motoRoutes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.get('/', (req, res) => res.send('api funcionando'));

app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/carro', carroRoutes); // 👈 novo
app.use('/api/moto', motoRoutes);


const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Servidor online e conectado com o DB');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));
  })
  .catch(erro => console.log('Erro interno do servidor:', erro));
