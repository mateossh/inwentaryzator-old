import Router, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const stock = await prisma.stock.findMany({
      select: {
        code: true,
        amount: true,
        product: {
          select: {
            name: true,
            measureUnit: true,
            price: true,
          }
        }
      }
    });

    res.status(200).json(stock);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req: Request, res: Response) => {
  const { code, amount } = req.body;

  try {
    const stockItem = await prisma.stock.create({
      data: { code, amount },
      select: {
        code: true,
        amount: true,
        product: {
          select: {
            name: true,
            measureUnit: true,
            price: true,
          }
        }
      },
    });
    
    res.status(201).json(stockItem);
  } catch (e) {
    res.status(500).json(e);
  }
});

interface StockRequestParams {
  amount?: number
}

router.put('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;
  const { amount } = req.body;

  const data: StockRequestParams = {};
  data.amount = amount ?? undefined;

  try {
    const updatedStock = await prisma.stock.update({
      where: { code },
      select: {
        code: true,
        amount: true,
        product: {
          select: {
            name: true,
            measureUnit: true,
            price: true,
          }
        }
      },
      data,
    });

    res.status(200).json(updatedStock);
  } catch (e) {
    res.status(500).json(e);
  }
})

router.delete('/:code', async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const deletedStock = await prisma.stock.delete({
      where: { code },
      select: {
        code: true,
        amount: true,
        product: {
          select: {
            name: true,
            measureUnit: true,
            price: true,
          }
        }
      },
    })

    res.status(200).json(deletedStock);
  } catch (e) {
    res.status(500).json(e);
  }
});
