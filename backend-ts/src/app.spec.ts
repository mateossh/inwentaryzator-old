import request from 'supertest';
import { app } from './app';

describe('App', () => {
  it('should send pong on /ping', async () => {
    const result = await request(app).get('/ping');

    expect(result.text).toBe('pong');
  })
});
