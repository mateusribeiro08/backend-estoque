require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);
const Produto = require('./Produto');
const Compra = require('./Compra');

const ItemCompra = sequelize.define('ItemCompra', {
  id_compra: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Compra',
      key: 'id_compra'
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
  tableName: 'item_compra',
  timestamps: false
});

ItemCompra.belongsTo(Produto, { foreignKey: 'id_produto' });


module.exports = ItemCompra;
