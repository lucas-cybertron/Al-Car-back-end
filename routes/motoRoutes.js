const express = require('express');
const router = express.Router();
const moto = require('../controllers/authmoto'); // controlador com as funções

// Criar moto
router.post('/', moto.createMoto);

// Listar motos
router.get('/', moto.listMotos);

// Buscar moto por ID
router.get('/:id', moto.listMotoById);

// Atualizar moto
router.put('/:id', moto.updateMoto);

// Deletar moto
router.delete('/:id', moto.deleteMoto);

module.exports = router;
