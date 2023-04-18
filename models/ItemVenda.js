require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);
const Produto = require('./Produto');
const Venda = require('./Venda');

const ItemVenda = sequelize.define('ItemVenda', {
  id_venda: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Venda',
      key: 'id_venda'
    }
  },
  id_produto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Produto',
      key: 'id_produto'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  preco_unitario: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'item_venda',
  timestamps: false
});

ItemVenda.belongsTo(Produto, { foreignKey: 'id_produto' });


module.exports = ItemVenda;