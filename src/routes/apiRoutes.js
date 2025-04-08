import express from 'express';
import { StatusCodes } from 'http-status-codes';

import v1Router from './v1/v1Router.js';

const apiRouter = express.Router();

apiRouter.use('/v1', v1Router);

apiRouter.use('/', (req, res, next) => {
  return res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Path Not Found',
    success: false
  });
});

export default apiRouter;
