const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Compra = require('../models/Compra');
const ItemCompra = require('../models/ItemCompra');
const Produto = require('../models/Produto');

router.post('/entrada', async (req, res) => {
  try {
    const { entradas, total } = req.body;

    // Cria a nova compra
    const compra = await Compra.create({
      id_usuario: req.session.userId, // usa o ID do usuário armazenado na sessão
      data_compra: new Date(),
      total
    });

    const itensCompra = [];

    // Cria um item de compra para cada objeto de entrada
    for (let i = 0; i < entradas.length; i++) {
      const entrada = entradas[i];
      const itemCompra = await ItemCompra.create({
        id_compra: compra.id_compra,
        id_produto: entrada.id_produto,
        quantidade: entrada.quantidade,
        preco_unitario: entrada.preco,
        subtotal: entrada.quantidade * entrada.preco
      });
      itensCompra.push(itemCompra);

      // Atualiza a quantidade do produto em estoque
      await Produto.update({
        estoque: sequelize.literal(`estoque + ${entrada.quantidade}`)
      }, {
        where: {
          id_produto: entrada.id_produto
        }
      });
    }

    res.status(201).json({ message: 'Entrada salva com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar entrada' });
  }
});

module.exports = router;
