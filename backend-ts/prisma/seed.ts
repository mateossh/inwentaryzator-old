import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const product = await prisma.product.create({
    data: {
      code: '123',
      name: 'qwer',
      price: 12.34,
      measureUnit: 'szt.',
    },
  })

  const product2 = await prisma.product.create({
    data: {
      code: '124',
      name: 'zxcv',
      price: 71.23,
      measureUnit: 'szt.',
    },
  })

  console.log([product, product2]);

  
  const stock = await prisma.stock.create({
    data: {
      code: '124',
      amount: 1,
    },
  })

  const stock2 = await prisma.stock.create({
    data: {
      code: '123',
      amount: 7,
    },
  })


  console.log([stock, stock2]);
};


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
