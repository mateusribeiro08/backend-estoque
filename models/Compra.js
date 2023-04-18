require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);
const Usuario = require('./User');
const ItemCompra = require('./ItemCompra');

const Compra = sequelize.define('Compra', {
  id_compra: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data_compra: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'compra',
  timestamps: false // desabilita a criação automática das colunas createdAt e updatedAt
});

Compra.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Compra.hasMany(ItemCompra, { foreignKey: 'id_compra' });

module.exports = Compra;
