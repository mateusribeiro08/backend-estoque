const express = require('express');
const router = express.Router();
const Compra = require('../models/Compra');
const ItemCompra = require('../models/ItemCompra');
const Produto = require('../models/Produto');

router.get('/compras', async (req, res) => {
  try {
    const compras = await Compra.findAll({
      include: [
        {
          model: ItemCompra,
          include: [
            {
              model: Produto,
              attributes: ['nome']
            }
          ]
        }
      ]
    });

    res.json(compras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar compras' });
  }
});

module.exports = router;
