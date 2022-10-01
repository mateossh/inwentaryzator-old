import request from 'supertest';
import { app } from '../app';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Stock', () => {
  // it('should add product', async () => {
  //   const data = {
  //     code: "1892374",
  //     name: "something something blah blah blah",
  //     price: "12.34",
  //     measureUnit: "szt."
  //   }
  //
  //   // remove product with this code from db before sending request
  //   await prisma.product.delete({
  //     where: {
  //       code: data.code
  //     }
  //   })
  //
  //   const response = await request(app).post('/api/v2/product').send(data)
  //
  //   expect(response.status).toEqual(201);
  //   expect(response.body.code).toBe(data.code);
  //   expect(response.body.name).toBe(data.name);
  //   expect(response.body.price).toBe(data.price);
  //   expect(response.body.measureUnit).toBe(data.measureUnit);
  // })
});
