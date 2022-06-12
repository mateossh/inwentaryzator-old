const router = require('express').Router();
const db = require('../db');

// GET ALL PRODUCTS
// TODO: this should return Price.toFixed(2)
router.get('/', async (req, res) => {
  try {
    const products = await db.product.findAll();
    res.status(200).json(products);
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

// ADD NEW PRODUCT
router.post('/', async (req, res) => {
  const data = {
    code: req.body.code,
    name: req.body.name,
    price: req.body.price,
    measureUnit: req.body.measureUnit,
  };

  try {
    const newProduct = await db.product.create(data);
    res.status(201).json(newProduct);
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

// UPDATE PRODUCT WITH CODE
router.put('/:code', async (req, res) => {
  try {
    const foundProduct = await db.product.findOne({ where: { code: req.params.code }});

    foundProduct.name = req.body.name ? req.body.name : foundProduct.name;
    foundProduct.price = req.body.price ? req.body.price : foundProduct.price;
    foundProduct.measureUnit = req.body.measureUnit ? req.body.measureUnit : foundProduct.measureUnit;

    const updatedProduct = await foundProduct.save();

    res.status(200).json(updatedProduct);
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

// DELETE PRODUCT WITH CODE
router.delete('/:code', async (req, res) => {
  try {
    const destroyedRows = await db.product.destroy({ where: { code: req.params.code }});

    res.status(200).json({ destroyedRows });
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

module.exports = router;
