const router = require('express').Router();
const db = require('../db');

// GET ALL PRODUCTS
// TODO: this should return Price.toFixed(2)
router.get('/', (req, res) => {
  db.Product.findAll({})
    .then(result => {
      res.status(200).json(result);
    });
});

// ADD NEW PRODUCT
router.post('/', (req, res) => {
  db.Product.create({
    Code: req.body.Code,
    Name: req.body.Name,
    Price: req.body.Price,
    MeasureUnit: req.body.MeasureUnit,
  }).then(result => {
    res.status(201).json({ message: 'Product added successfully' });
  }).catch(err => {
    res.status(400).json({ message: 'Error', error: err });
  });
});

// UPDATE PRODUCT WITH CODE
router.put('/:code', (req, res) => {
  if (req.body.Name === '' || req.body.Price === '' || req.body.MeasureUnit === '') {
    res.status(400).json({ message: 'Error! At least one field is empty' });
    return;
  }

  db.Product.findOne({
    where: { Code: req.params.code }
  }).then(res => {
    res.update({
      Name: req.body.Name,
      Price: req.body.Price,
      MeasureUnit: req.body.MeasureUnit,
    }).then(res => {
      res.status(200).json({ message: 'Product updated successfully' });
    });
  }).catch(err => {
    res.status(400).json({ message: 'Error', error: err });
  });
  return;
});

// DELETE PRODUCT WITH CODE
// NOTE: behavior same as updating product - error even deleting was successful
router.delete('/:code', (req, res) => {
  db.Product.destroy({
    where: { Code: req.params.code }
  }).then(res => {
    res.status(200).json({ message: 'Produt updated successfully' });
  }).catch(err => {
    res.status(400).json({ message: 'Error', error: err });
  });
});

module.exports = router;
