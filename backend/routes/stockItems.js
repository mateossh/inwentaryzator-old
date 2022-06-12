const router = require('express').Router();
const db = require('../db');

// GET ALL ITEMS FROM STOCK
router.get('/', async (req, res) => {
  const findOptions = {
    include: [
      {
        model: db.product,
        attributes: ['name', 'measureUnit', 'price'],
      },
    ],
  };

  try {
    let products = [];

    const result = await db.stockItem.findAll(findOptions);
    result.forEach(item => {
      const product = {
        ...item.dataValues,
        ...item.product.dataValues,
        totalValue: item.product.price * item.amount,
      };

      delete product.product;
      products.push(product);
    });

    res.status(200).json(products);
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

// ADD NEW ITEM TO STOCK
router.post('/', async (req, res) => {
  const data = {
    code: req.body.code,
    amount: req.body.amount,
  };

  try {
    const newProduct = await db.stockItem.create(data);
    res.status(201).json(newProduct);
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

// UPDATE STOCK ITEM WITH CODE
router.put('/:code', async (req, res) => {
  try {
    const foundRecord = await db.stockItem.findOne({ where: { code: req.params.code}});

    foundRecord.amount = req.body.amount ? req.body.amount : foundRecord.amount;

    const updatedRecord = await foundRecord.save();

    res.status(200).json(updatedRecord);
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

// DELETE STOCK ITEM WITH CODE
router.delete('/:code', async (req, res) => {
  try {
    const destroyedRows = await db.stockItem.destroy({ where: { code: req.params.code }});

    res.status(200).json({ destroyedRows });
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

module.exports = router;
