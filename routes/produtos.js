const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Rota para listar todos os produtos sem informações de estoque
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    console.log('Erro ao buscar produtos:', error);
    res.status(500).json({ mensagem: 'Erro ao buscar produtos' });
  }
});

module.exports = router;
