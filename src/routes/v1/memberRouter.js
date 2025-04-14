import express from 'express';

import { isUserPartOfTheWorkspaceController } from '../../b_controllers/memberController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const memberRouter = express.Router();

memberRouter
  .route('/workspace-check/:workspaceId')
  .get(isAuthenticated, isUserPartOfTheWorkspaceController);

export default memberRouter;
