const router = require('express').Router();
const db = require('../db');

// GET ALL PRODUCTS
// TODO: this should return Price.toFixed(2)
router.get('/', (req, res) => {
  db.product.findAll({})
    .then(result => {
      res.status(200).json(result);
    });
});

// ADD NEW PRODUCT
router.post('/', (req, res) => {
  db.product.create({
    code: req.body.code,
    name: req.body.name,
    price: req.body.price,
    measureUnit: req.body.measureUnit,
  }).then(result => {
    console.log('bleh', result.dataValues);
    res.status(201).json({ message: 'Product added successfully', product: result.dataValues });
  }).catch(err => {
    res.status(400).json({ message: 'Error', ...err });
  });
});

// UPDATE PRODUCT WITH CODE
router.put('/:code', (req, res) => {
  if (req.body.name === '' || req.body.price === '' || req.body.measureUnit === '') {
    res.status(400).json({ message: 'Error! At least one field is empty' });
    return;
  }

  db.product.findOne({
    where: { code: req.params.code }
  }).then(res => {
    res.update({
      name: req.body.name,
      price: req.body.price,
      measureUnit: req.body.measureUnit,
    }).then(res => {
      res.status(200).json({ message: 'Product updated successfully' });
    });
  }).catch(err => {
    res.status(400).json({ message: 'Error', ...err });
  });
  return;
});

// DELETE PRODUCT WITH CODE
// NOTE: behavior same as updating product - error even deleting was successful
router.delete('/:code', (req, res) => {
  db.product.destroy({
    where: { code: req.params.code }
  }).then(res => {
    res.status(200).json({ message: 'Produt updated successfully' });
  }).catch(err => {
    res.status(400).json({ message: 'Error', ...err });
  });
});

module.exports = router;
