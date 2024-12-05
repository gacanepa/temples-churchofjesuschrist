import { Router } from 'express';
import isAuthenticated from '../middleware/authenticate.js';
import {
  createTemple,
  getAllTemples,
  getTempleById,
  softDeleteTemple,
  updateTemple,
} from '../controllers/temples.js';

const router = Router();

router.get('/', isAuthenticated, getAllTemples);
router.get('/:id', isAuthenticated, getTempleById);
router.post('/', isAuthenticated, createTemple);
router.put('/:id', isAuthenticated, updateTemple);
router.delete('/:id', isAuthenticated, softDeleteTemple);

export default router;
