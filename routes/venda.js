const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Venda = require('../models/Venda');
const ItemVenda = require('../models/ItemVenda');
const Produto = require('../models/Produto');
// Rota para criar uma nova venda
router.post('/venda', async (req, res) => {
  try {
    const { saidas, tipoPagamento, total } = req.body;

    // Cria uma nova venda
    const venda = await Venda.create({
      id_usuario: 1, // Substitua pelo id do usuário logado
      data_venda: new Date(),
      total,
      tipo_pagamento: tipoPagamento
    });

    const itensVenda = [];

    // Cria um item de compra para cada objeto de entrada
    for (let i = 0; i < saidas.length; i++) {
      const saida = saidas[i];
      const itemVenda = await ItemVenda.create({
        id_venda: venda.id_venda,
        id_produto: saida.produto.id_produto,
        quantidade: saida.quantidade,
        preco_unitario: saida.produto.preco,
        subtotal: saida.quantidade * saida.produto.preco
      });
      itensVenda.push(itemVenda);

      await Produto.update({
        estoque: sequelize.literal(`estoque - ${saida.quantidade}`)
      }, {
        where: {
          id_produto: saida.produto.id_produto
        }
      });
    }

    // Retorna uma mensagem de sucesso
    return res.status(201).json({ message: 'Venda realizada com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Ocorreu um erro. Tente novamente.' });
  }
});
module.exports = router;
