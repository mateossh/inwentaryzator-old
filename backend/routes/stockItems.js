const router = require('express').Router();
const db = require('../db');

// GET ALL ITEMS FROM STOCK
router.get('/', (req, res) => {
  const instance = db.stockItem.findAll({
    include: [
      {
        model: db.product,
        attributes: ['name', 'measureUnit', 'price'],
      },
    ],
  })
    .then(result => {
      const finalResult = [];
      result.forEach(item => {
        const copy = {};
        Object.assign(copy, item.dataValues, item.product.dataValues);
        Object.assign(copy, { totalValue: copy.price * copy.amount });
        delete copy.product;
        finalResult.push(copy);
      });

      res.status(200).json(finalResult);
    });
});

// ADD NEW ITEM TO STOCK
router.post('/', (req, res) => {
  db.stockItem.create({
    code: req.body.code,
    amount: req.body.amount,
  }).then(result => {
    res.status(201).json({ message: 'Stock item added successfully' });
  }).catch(err => {
    res.status(400).json({ message: 'Error', ...err });
  });
});

// UPDATE STOCK ITEM WITH CODE
router.put('/:code', (req, res) => {
  if (req.body.amount === '') {
    res.status(400).json({ message: 'Error! At least one field is empty' });
    return;
  }

  db.stockItem.findOne({
    where: { code: req.params.code }
  }).then(res => {
    res.update({ amount: req.body.amount }).then(res => {
      res.status(200).json({ message: 'Stock item updated successfully' });
    });
  }).catch(err => {
    res.status(400).json({ message: 'Error', ...err });
  });
  return;
});

// DELETE STOCK ITEM WITH CODE
router.delete('/:code', (req, res) => {
  db.stockItem.destroy({
    where: { code: req.params.code }
  }).then(result => {
    res.status(200).json({ message: 'Stock item deleted successfully' });
  }).catch(err => {
    res.status(400).json({ message: 'Error', ...err });
  });
});

module.exports = router;
