const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.userId = null;
  res.redirect('/'); // redireciona o usuário para a página inicial após o logout
});

module.exports = router;