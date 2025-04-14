import express from 'express';

import channelRouter from './channelRouter.js';
import memberRouter from './memberRouter.js';
import userRouter from './userRouter.js';
import workspaceRouter from './workspaceRoutes.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/workspace', workspaceRouter);
v1Router.use('/channel', channelRouter);
v1Router.use('/member', memberRouter);

export default v1Router;
