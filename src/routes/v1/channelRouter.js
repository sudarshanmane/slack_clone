import express from 'express';

import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { getChannelMessagesByChannelIdController } from './../../b_controllers/channelController.js';

const channelRouter = express.Router();

channelRouter
  .route('/:channelId/workspace/:workspaceId')
  .get(isAuthenticated, getChannelMessagesByChannelIdController);

export default channelRouter;
