import express from 'express';
import { getTemples } from '../controllers/templesController.js';

const templesRouter = express.Router();

templesRouter.route('/').get(getTemples);

export default templesRouter;
