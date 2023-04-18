require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URL);
const Usuario = require('./User');
const ItemVenda = require('./ItemVenda')

const Venda = sequelize.define('Venda', {
  id_venda: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  data_venda: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  tipo_pagamento: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'venda',
  timestamps: false // desabilita a criação automática das colunas createdAt e updatedAt
});

Venda.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Venda.hasMany(ItemVenda, { foreignKey: 'id_venda' });

module.exports = Venda;
