const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const db = {};

const Product = sequelize.define('product', {
  Code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  MeasureUnit: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {});

const StockItem = sequelize.define('stockItem', {
  Code: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  Amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {});

Product.sync();
StockItem.sync();

StockItem.belongsTo(Product, { foreignKey: 'Code' });
Product.hasOne(StockItem, { foreignKey: 'Code' });

db.sequelize = sequelize;
db.Product = Product;
db.StockItem = StockItem;

module.exports = db;
