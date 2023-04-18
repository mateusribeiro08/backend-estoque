require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
const session = require('express-session');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout')
const cadastroRouter = require('./routes/cadastro');
const produtosRouter = require('./routes/produtos');
const entradaRouter = require('./routes/entrada');
const edicaoRouter = require('./routes/edicao');
const cadastroUsuarioRouter = require('./routes/cadastroUsuario');
const vendaRouter = require('./routes/venda');
const vendasRouter = require('./routes/vendas');
const comprasRouter = require('./routes/compras');
const itensVendasRouter = require('./routes/itens_venda');

app.use(session({
  secret: 'mySecretKey', // define uma chave secreta para assinar a sessão
  resave: false,
  saveUninitialized: false
}));

// Configuração de conexão com o banco de dados MySQL usando Sequelize
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'mysql',
  dialectModule: mysql2,
  define: {
    timestamps: false // desabilita a criação automática das colunas createdAt e updatedAt
  }
});

// Teste da conexão com o banco de dados
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida com sucesso!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
})();

// Rotas
app.use(loginRouter);
app.use(logoutRouter);
app.use(cadastroRouter);
app.use(produtosRouter);
app.use(entradaRouter);
app.use(edicaoRouter);
app.use(cadastroUsuarioRouter);
app.use(vendaRouter);
app.use(vendasRouter);
app.use(itensVendasRouter);
app.use(comprasRouter);


// Inicialização do servidor
const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});
