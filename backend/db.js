const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const db = {};

const product = sequelize.define('product', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  measureUnit: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {});

const stockItem = sequelize.define('stockItem', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {});

product.sync();
stockItem.sync();

stockItem.belongsTo(product, { foreignKey: 'code' });
product.hasOne(stockItem, { foreignKey: 'code' });

db.sequelize = sequelize;
db.product = product;
db.stockItem = stockItem;

module.exports = db;
