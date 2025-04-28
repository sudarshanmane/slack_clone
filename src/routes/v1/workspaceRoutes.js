import express from 'express';

import {
  addChannelToWorkspaceController,
  addMemberToWorkspaceController,
  createWorkspceSpaceController,
  deleteWorkspaceController,
  getALLWorkSpaceByMemberIdController,
  getALLWorkSpaceController,
  getUserWorkspaceController,
  getWorkSpaceByIdController,
  getWorkSpaceByJoinCodeController,
  getWorkSpaceByNameController,
  updateWorkspaceController
} from '../../b_controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import channelZodSchema from '../../validators/channel/channelSchema.js';
import workspaceMemberZodSchema from '../../validators/workspace/workspaceMemberSchema.js';
import workspaceZodSchema from '../../validators/workspace/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';

const workspaceRouter = express.Router();

workspaceRouter
  .route('/name/:name')
  .get(isAuthenticated, getWorkSpaceByNameController);

workspaceRouter
  .route('/joinCode/:joinCode')
  .get(isAuthenticated, getWorkSpaceByJoinCodeController);

workspaceRouter
  .route('/:id/add-channel')
  .put(
    isAuthenticated,
    validate(channelZodSchema),
    addChannelToWorkspaceController
  );

workspaceRouter
  .route('/:id/add-member')
  .put(
    isAuthenticated,
    validate(workspaceMemberZodSchema),
    addMemberToWorkspaceController
  );

workspaceRouter
  .route('/get-member-workspace/:member_id')
  .get(isAuthenticated, getALLWorkSpaceByMemberIdController);

workspaceRouter
  .route('/:id')
  .get(isAuthenticated, getWorkSpaceByIdController)
  .delete(isAuthenticated, deleteWorkspaceController)
  .put(isAuthenticated, updateWorkspaceController);

workspaceRouter
  .route('/get-member-workspaces/:id')
  .get(isAuthenticated, getUserWorkspaceController);

workspaceRouter
  .route('/')
  .get(isAuthenticated, getALLWorkSpaceController)
  .post(
    isAuthenticated,
    validate(workspaceZodSchema),
    createWorkspceSpaceController
  );

export default workspaceRouter;
