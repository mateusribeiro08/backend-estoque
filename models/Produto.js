require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);

const Produto = sequelize.define('Produto', {
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  fornecedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detalhes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'produto',
  timestamps: false // desabilita a criação automática das colunas createdAt e updatedAt
});

Produto.associate = (models) => {
  Produto.hasMany(models.ItemCompra, { foreignKey: 'id_produto' });
  Produto.hasMany(models.ItemVenda, { foreignKey: 'id_produto'});
};

module.exports = Produto;
