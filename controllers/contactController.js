const Contact = require('../models/contacts');

exports.createContact = async (req, res) => {
 
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }   
      const newContact = await Contact.create({ name, email, message});
      const { id } = newContact;
      res.status(201).json({ name, email, message });
    } catch (error) {
      console.error('Erro ao criar contato:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
 
    }
 
  }

  exports.listContact = async (_req, res) => {
 
    try {
      const contacts = await Contact.findAll({
        attributes: ['id', 'name', 'email', 'message', 'createdAt', 'updatedAt']
      });
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Erro interno do servidor.', error });
    }
 
  }


