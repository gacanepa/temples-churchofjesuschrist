import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Temple from '../models/Temple.js';

export const getTemples = async (_req: Request, res: Response) => {
  try {
    const temples = await Temple.find();
    res.status(StatusCodes.OK).json({ temples });
  } catch (error) {
    if (error instanceof Error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
};
