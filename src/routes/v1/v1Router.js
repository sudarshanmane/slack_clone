import express from 'express';

import channelRouter from './channelRouter.js';
import memberRouter from './memberRouter.js';
import messageRouter from './messageRouter.js';
import userRouter from './userRouter.js';
import workspaceRouter from './workspaceRoutes.js';

const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/workspaces', workspaceRouter);
v1Router.use('/channel', channelRouter);
v1Router.use('/member', memberRouter);
v1Router.use('/message', messageRouter);

export default v1Router;
