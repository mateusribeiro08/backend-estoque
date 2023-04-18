const express = require('express');
const { Sequelize } = require('sequelize');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false
}));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  define: {
    timestamps: false
  }
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
})();

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await sequelize.models.Usuario.findOne({ where: { email, senha } });
  if (usuario) {
    req.session.usuario = usuario;
    res.json(usuario);
  } else {
    res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
  }
});

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});
