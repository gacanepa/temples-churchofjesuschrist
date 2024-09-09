import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db.js';
import templesRouter from './routes/templesRouter.js';

dotenv.config();

const port: string = process.env.PORT ?? "5000";

const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  console.log(Object.keys(req));
  res.send('Hello World!');
});

app.use('/api/temples', templesRouter);

const start = async () => {
  try {
    await connectDatabase();
    app.listen(process.env.PORT, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

start();
