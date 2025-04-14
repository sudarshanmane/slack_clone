import express from 'express';

import { getChannelByChannelIdController } from '../../b_controllers/channelController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const channelRouter = express.Router();

channelRouter
  .route('/:channelId/workspace/:workspaceId')
  .get(isAuthenticated, getChannelByChannelIdController);

export default channelRouter;
