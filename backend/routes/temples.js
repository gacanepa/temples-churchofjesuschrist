import { Router } from 'express';
import {
  createTemple,
  getAllTemples,
  getTempleById,
  softDeleteTemple,
  updateTemple,
} from '../controllers/contacts.js';

const router = Router();

router.get('/', getAllTemples);
router.get('/:id', getTempleById);
router.post('/', createTemple);
router.put('/:id', updateTemple);
router.delete('/:id', softDeleteTemple);

export default router;
