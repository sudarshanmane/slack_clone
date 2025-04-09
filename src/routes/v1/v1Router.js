import express from 'express';

import userRouter from './userRouter.js';
import workspaceRouter from './workspaceRoutes.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/workspace', workspaceRouter);

export default v1Router;
