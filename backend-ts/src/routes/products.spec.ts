import request from 'supertest';
import { app } from '../app';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe('Products', () => {
  it('should add product', async () => {
    const data = {
      code: "1892374",
      name: "something something blah blah blah",
      price: "12.34",
      measureUnit: "szt."
    }

    // remove product with this code from db before sending request
    await prisma.product.delete({
      where: {
        code: data.code
      }
    })

    const response = await request(app).post('/api/v2/product').send(data)

    expect(response.status).toEqual(201);
    expect(response.body.code).toBe(data.code);
    expect(response.body.name).toBe(data.name);
    expect(response.body.price).toBe(data.price);
    expect(response.body.measureUnit).toBe(data.measureUnit);
  })

  it('should update product', async () => {
    const productToUpdate = {
      code: "3139266",
      name: "product",
      price: "12.34",
      measureUnit: "szt.",
    }

    const data = {
      name: "asdf",
      price: "43.21",
    };

    await prisma.product.upsert({
      where: {
        code: productToUpdate.code,
      },
      update: productToUpdate,
      create: productToUpdate,
    });

    const response = await request(app)
      .put(`/api/v2/product/${productToUpdate.code}`)
      .send(data)

    expect(response.status).toEqual(200);
    expect(response.body.code).toBe(productToUpdate.code);
    expect(response.body.name).toBe(data.name);
    expect(response.body.price).toBe(data.price);
    expect(response.body.measureUnit).toBe(productToUpdate.measureUnit);
  })

  it('should delete product', async () => {
    const productToDelete = {
      code: "3139266",
      name: "asdf",
      price: "43.21",
      measureUnit: "szt.",
    }

    const response = await request(app)
      .delete(`/api/v2/product/${productToDelete.code}`)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body.code).toBe(productToDelete.code);
    expect(response.body.name).toBe(productToDelete.name);
    expect(response.body.price).toBe(productToDelete.price);
    expect(response.body.measureUnit).toBe(productToDelete.measureUnit);
  })
});
