const express = require('express');
const router = express.Router();
const Venda = require('../models/Venda');
const ItemVenda = require('../models/ItemVenda');
const Produto = require('../models/Produto');

router.get('/vendas', async (req, res) => {
  try {
    const vendas = await Venda.findAll({
      include: [
        {
          model: ItemVenda,
          include: [
            {
              model: Produto,
              attributes: ['nome']
            }
          ]
        }
      ]
    });

    res.json(vendas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar vendas' });
  }
});

module.exports = router;
