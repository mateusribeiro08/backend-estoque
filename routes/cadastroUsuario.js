const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/cadastroUsuario', async (req, res) => {
  try {
    const { nome, senha, email } = req.body;
    const user = await User.create({ nome, senha, email });
    console.log(`Usuário cadastrado: ${user.nome}, ${user.email}`);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível cadastrar o usuário.' });
  }
});

module.exports = router;