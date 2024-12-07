import { StatusCodes } from 'http-status-codes';

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(StatusCodes.UNAUTHORIZED).send('Unauthorized');
  }
  next();
};

export default isAuthenticated;
