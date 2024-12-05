import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get('/', (_req, res) => {
  res.send('<h1>Welcome to the temples API</h1>');
});

router.get('/login', passport.authenticate('github'), (_req, _res) => {});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});
  
export default router;