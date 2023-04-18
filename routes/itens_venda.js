const express = require('express');
const router = express.Router();
const ItemVenda = require('../models/ItemVenda');
const Produto = require('../models/Produto');

router.get('/itens_venda', async (req, res) => {
  try {
    const itens_venda = await ItemVenda.findAll({
      include: [
        {
          model: Produto,
          attributes: ['nome']
        }
      ]
    });

    res.json(itens_venda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar itens de venda' });
  }
});

module.exports = router;
