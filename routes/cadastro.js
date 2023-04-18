const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Rota para criar um novo produto
router.post('/cadastro', async (req, res) => {
  try {
    const produto = await Produto.create({
      nome: req.body.nome,
      descricao: req.body.descricao,
      preco: req.body.preco,
      fornecedor: req.body.fornecedor,
      detalhes: req.body.detalhes,
      estoque: req.body.estoque
    });
    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Não foi possível cadastrar o produto.' });
  }
});

module.exports = router;
