import { Router } from 'express';
import isAuthenticated from '../middleware/authenticate.js';
import RateLimit from 'express-rate-limit';
import {
  createTemple,
  getAllTemples,
  getTempleById,
  softDeleteTemple,
  updateTemple,
} from '../controllers/temples.js';
import {
  RATE_LIMIT_TIME_WINDOW,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_MESSAGE,
} from '../constants.js';

const router = Router();

// Configure rate limiter to prevent abuse of the API
const limiter = RateLimit({
  windowMs: RATE_LIMIT_TIME_WINDOW,
  max: RATE_LIMIT_MAX_REQUESTS,
  message: RATE_LIMIT_MESSAGE,
});

router.use(limiter);

router.get('/', isAuthenticated, getAllTemples);
router.get('/:id', isAuthenticated, getTempleById);
router.post('/', isAuthenticated, createTemple);
router.put('/:id', isAuthenticated, updateTemple);
router.delete('/:id', isAuthenticated, softDeleteTemple);

export default router;
