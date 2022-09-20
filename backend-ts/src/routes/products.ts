import Router, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const products = await prisma.product.findMany();

  res.json(products);
});

router.post('/', async (req: Request, res: Response) => {
  const { code, name, price, measureUnit } = req.body;

  try {
    const product = await prisma.product.create({
      data: { code, name, price, measureUnit },
    });
    
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
});

interface ProductRequestParams {
  code?: string
  name?: string
  price?: number
  measureUnit?: string
}

router.put('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  const { name, price, measureUnit } = req.body;

  const data: ProductRequestParams = {};
  data.name = name ?? undefined;
  data.price = price ?? undefined;
  data.measureUnit = measureUnit ?? undefined;

  try {
    const updatedProduct = await prisma.product.update({
      where: { code },
      data,
    });

    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json(e);
  }
})

router.delete('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { code },
    })

    res.status(200).json(deletedProduct);
  } catch (e) {
    res.status(500).json(e);
  }
});
