import express from 'express';

import {
  addMemberToWorkspaceController,
  createWorkspceSpaceController,
  getALLWorkSpaceController,
  getWorkSpaceByIdController,
  getWorkSpaceByJoinCodeController,
  getWorkSpaceByNameController
} from '../../b_controllers/workspaceController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import workspaceMemberZodSchema from '../../validators/workspace/workspaceMemberSchema.js';
import workspaceZodSchema from '../../validators/workspace/workspaceSchema.js';
import { validate } from '../../validators/zodValidator.js';

const workspaceRouter = express.Router();

workspaceRouter
  .route('/')
  .get(isAuthenticated, getALLWorkSpaceController)
  .post(
    isAuthenticated,
    validate(workspaceZodSchema),
    createWorkspceSpaceController
  );

workspaceRouter
  .route('/:id')
  .get(isAuthenticated, getWorkSpaceByIdController)
  .put(
    isAuthenticated,
    validate(workspaceMemberZodSchema),
    addMemberToWorkspaceController
  );

workspaceRouter
  .route('/name/:name')
  .get(isAuthenticated, getWorkSpaceByNameController);

workspaceRouter
  .route('/joinCode/:joinCode')
  .get(isAuthenticated, getWorkSpaceByJoinCodeController);

export default workspaceRouter;
