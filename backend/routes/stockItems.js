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
    const newProductInStock = await db.stockItem.create(data);
    const product = await db.product.findByPk(data.code);

    const response = {
      ...newProductInStock.dataValues,
      ...product.dataValues,
      totalValue: product.dataValues.price * newProductInStock.dataValues.amount
    };

    res.status(201).json(response);
  } catch(e) {
    res.status(500).json({ ...e });
  }
});

// UPDATE STOCK ITEM WITH CODE
router.put('/:code', async (req, res) => {
  const options = {
    where: {
      code: req.params.code
    },
    include: [
      {
        model: db.product,
        attributes: ['name', 'measureUnit', 'price'],
      },
    ],
  };

  try {
    const foundRecord = await db.stockItem.findOne(options);

    foundRecord.amount = req.body.amount ? req.body.amount : foundRecord.amount;

    const updatedRecord = await foundRecord.save();

    const response = {
      ...foundRecord.product.dataValues,
      code: foundRecord.code,
      amount: foundRecord.amount,
      totalValue: foundRecord.product.dataValues.price * foundRecord.amount,
      createdAt: foundRecord.createdAt,
      updatedAt: foundRecord.updatedAt,
    }

    res.status(200).json(response);
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
