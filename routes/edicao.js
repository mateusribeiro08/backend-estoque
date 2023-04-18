const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Rota para atualizar um produto
router.post('/edicao', async (req, res) => {
  try {
    const { id_produto, nome, descricao, preco, fornecedor, detalhes } = req.body;
    
    // Atualiza o produto no banco de dados
    await Produto.update(
      { nome, descricao, preco, fornecedor, detalhes },
      { where: { id_produto } }
    );
    
    res.json({ message: 'Produto atualizado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o produto.' });
  }
});

module.exports = router;
