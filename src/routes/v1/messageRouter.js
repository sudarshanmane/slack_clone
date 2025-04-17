import express from 'express';

import { getAllMessagesOfAchannelAndWorkspaceController } from '../../b_controllers/messageController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const messageRouter = express.Router();

messageRouter
  .route('/:channelId')
  .get(isAuthenticated, getAllMessagesOfAchannelAndWorkspaceController);

export default messageRouter;
