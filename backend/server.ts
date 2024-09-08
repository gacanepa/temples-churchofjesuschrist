import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db.js';

dotenv.config();

const port: string = process.env.PORT ?? "5000";

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  console.log(Object.keys(req));
  connectDatabase();
  res.send('Hello World!');
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${port}`));
