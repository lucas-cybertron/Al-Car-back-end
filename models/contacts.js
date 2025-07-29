const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Contact = sequelize.define('Contact', {
    // Campo ID: chave primária, número inteiro e autoincrementável
    id: {
      type: DataTypes.INTEGER,       // Tipo número inteiro
      autoIncrement: true,           // Será incrementado automaticamente
      primaryKey: true,              // Define como chave primária (PK)
    },

    // Campo nome do usuário
    name: {
      type: DataTypes.STRING,        // Texto simples
      allowNull: false,              // Campo obrigatório (não pode ser nulo)
    },
   
    // Campo e-mail do usuário
    email: {
      type: DataTypes.STRING,        // Texto simples
      allowNull: false,              // Obrigatório
               
    },
   
    message: {
        type: DataTypes.TEXT,        // Texto simples
        allowNull: false,              // Campo obrigatório (não pode ser nulo)
     
    }
   
  }, {
    // Configurações adicionais do modelo
   
    tableName: 'Contacts',              // Nome da tabela no banco de dados (evita plural automático)
   
    timestamps: true,                // Cria automaticamente os campos createdAt e updatedAt
  });
   
  // Exporta o modelo para ser utilizado em outras partes da aplicação
  module.exports = Contact;
   
 