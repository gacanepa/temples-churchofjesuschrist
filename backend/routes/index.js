import { Router } from 'express';
import passport from 'passport';
const router = Router();

router.get('/', (req, res) => res.send(req.session.user !== undefined
  ? `<h1>Hello, ${req.session.user.displayName}</h1>`
  : '<h1>Welcome to the temples API</h1>'));

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