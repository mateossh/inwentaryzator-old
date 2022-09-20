import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';

import { router as products } from './routes/products';
import { router as stock } from './routes/stock';

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api/v2/product', products);
app.use('/api/v2/stock', stock);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
