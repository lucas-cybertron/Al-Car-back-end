// routes/carroRoutes.js
const express = require('express');
const router = express.Router();
const { registrarCarro } = require('../controllers/authCarro');

router.post('/registrar', registrarCarro);

module.exports = router;
