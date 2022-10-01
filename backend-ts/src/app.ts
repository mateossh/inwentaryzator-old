import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';

import { router as productsRouter } from './routes/products';
import { router as stockRouter } from './routes/stock';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v2/product', productsRouter);
app.use('/api/v2/stock', stockRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong');
});

export { app };
