const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const products = require('./routes/products');
const stockItems = require('./routes/stockItems');
const healthcheck = require('./routes/healthcheck');

const port = 8080;
const app = express();

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully. Database is synced');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/product', products);
app.use('/api/v1/stock', stockItems);
app.use('/healthcheck', healthcheck);

app.get('/', (req, res) => {
  res.send('ecks deee');
});

app.listen(port, () => {
  console.log(`Inwentaryzator backend is running on ${port}`);
});
