const router = require('express').Router();
const db = require('../db');

// GET ALL ITEMS FROM STOCK
router.get('/', (req, res) => {
  const instance = db.StockItem.findAll({
    include: [
      {
        model: db.Product,
        attributes: ['Name', 'MeasureUnit', 'Price'],
      },
    ],
  })
    .then(result => {
      const finalResult = [];
      result.forEach(item => {
        const copy = {};
        Object.assign(copy, item.dataValues, item.product.dataValues);
        Object.assign(copy, { TotalValue: copy.Price * copy.Amount });
        delete copy.product;
        finalResult.push(copy);
      });

      res.status(200).json(finalResult);
    });
});

// ADD NEW ITEM TO STOCK
router.post('/', (req, res) => {
  db.StockItem.create({
    Code: req.body.Code,
    Amount: req.body.Amount,
  }).then(result => {
    res.status(201).json({ message: 'Stock item added successfully' });
  }).catch(err => {
    res.status(400).json({ message: 'Error', error: err });
  });
});

// UPDATE STOCK ITEM WITH CODE
// NOTE: this returns error even if update status is success. weird
router.put('/:code', (req, res) => {
  db.StockItem.update(
    {
      Amount: req.body.Amount,
    },
    {
      where: { Code: req.params.code }
    }
  ).then(result => {
    res.status(200).json({ message: 'Stock item updated successfully' });
  }).catch(err => {
    res.status(400).json({ message: 'Error', error: err });
  });
});

// DELETE STOCK ITEM WITH CODE
// NOTE: behavior same as updating - error even deleting was successful
router.delete('/:code', (req, res) => {
  db.StockItem.destroy({
    where: { Code: req.params.code }
  }).then(result => {
    res.status(200).json({ message: 'Stock item deleted successfully' });
  }).catch(err => {
    res.status(400).json({ message: 'Error', error: err });
  });
});

module.exports = router;
