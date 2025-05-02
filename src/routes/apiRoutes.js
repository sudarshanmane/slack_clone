import express from 'express';
import { StatusCodes } from 'http-status-codes';

import v1Router from './v1/v1Router.js';

const apiRouter = express.Router();

apiRouter.use('/v1', v1Router);

export default apiRouter;
