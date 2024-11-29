import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.send('<h1>Welcome to the temples API</h1>');
});

export default router;