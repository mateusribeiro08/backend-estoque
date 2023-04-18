const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.senha !== senha) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }
    console.log(`Usuário logado: ${user.nome}, ${user.email}`);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível fazer o login.' });
  }
});

module.exports = router;
