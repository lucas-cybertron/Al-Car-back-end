const express = require('express');
const router = express.Router();
const moto = require('../controllers/authmoto'); // seu controller está correto

// ✅ Rota de cadastro de motorista
router.post('/', moto.createMoto);

// ✅ Rota de login de motorista
router.post('/login', moto.loginMoto);

// ✅ Rota para buscar perfil do motorista com o carro associado
router.get('/:id/profile', moto.getMotoWithCarro);

// (opcional) outras rotas que você já tinha:
router.get('/', moto.listMotos);
router.get('/:id', moto.listMotoById);
router.put('/:id', moto.updateMoto);
router.delete('/:id', moto.deleteMoto);

module.exports = router;
