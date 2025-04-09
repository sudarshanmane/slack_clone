import { StatusCodes } from 'http-status-codes';

import userRepository from '../d_repository/userRepository.js';
import workspaceRepository from '../d_repository/workspaceRepository.js';
import { customErrorResponse } from '../utils/common/customObjects.js';
import ClientError from '../utils/errors/clientErrors.js';
import ValidationError from '../utils/errors/validationErrors.js';

export const getALLWorkSpaceService = async (limit, offset) => {
  try {
    const worspaceces = await workspaceRepository.getAll(limit, offset);
    return worspaceces;
  } catch (error) {
    throw error;
  }
};

export const createWorkspceSpaceService = async (workspaceObj) => {
  try {
    const workspace = await workspaceRepository.create(workspaceObj);
    return workspace;
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message);
    } else if (error.name === 'MongoServerError') {
      throw new ValidationError(
        {
          error: ['Worspace with the same name already exists!']
        },
        'Worspace with the same name Already exists!'
      );
    }

    throw error;
  }
};

export const addMemberToWorkspaceService = async (
  workSpaceId,
  memberId,
  role
) => {
  try {
    const memberCheck = await userRepository.findById(memberId);

    if (!memberCheck) {
      throw new ClientError({
        statusCode: StatusCodes.NOT_FOUND,
        explanation: ['Provided incorrect member details!'],
        message: 'Member not found!'
      });
    }

    const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(
      workSpaceId,
      memberId,
      role
    );

    return updatedWorkspace;
  } catch (error) {
    throw error;
  }
};

export const addChannelToWorkspaceService = async (
  workSpaceId,
  memberId,
  role
) => {
  try {
    const memberCheck = await userRepository.addChannelToWorkspace(memberId);

    if (!memberCheck) {
      throw new ClientError({
        statusCode: StatusCodes.NOT_FOUND,
        explanation: ['Provided incorrect member details!'],
        message: 'Member not found!'
      });
    }

    const memberAlreadyExistsInWorkspace =
      await workspaceRepository.checkMemberAlreadyAddedInWorkspace(
        workSpaceId,
        memberId
      );

    if (memberAlreadyExistsInWorkspace.length) {
      throw new ClientError({
        explanation: 'Member Already added to the workspace!',
        message: 'Member already exists to the workspace!'
      });
    }

    const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(
      workSpaceId,
      memberId,
      role
    );

    return updatedWorkspace;
  } catch (error) {
    throw error;
  }
};

export const getWorkSpaceByNameService = async (name) => {
  try {
    const workspace = await workspaceRepository.getWorspaceByName(name);

    if (!workspace) {
      throw customErrorResponse({
        explanation: ['No workspace found!'],
        message: 'Workspace not found!'
      });
    }

    return workspace;
  } catch (error) {
    throw error;
  }
};

export const getWorkSpaceByJoinCodeService = async (joinCode) => {
  try {
    const workspace =
      await workspaceRepository.getWorkspaceByJoinCode(joinCode);
    if (!workspace) {
      throw customErrorResponse({
        explanation: ['No workspace found!'],
        message: 'Workspace not found!'
      });
    }

    return workspace;
  } catch (error) {
    throw error;
  }
};

export const getWorkSpaceByIdService = async (joinCode) => {
  try {
    const workspace = await workspaceRepository.findById(joinCode);
    if (!workspace) {
      throw customErrorResponse({
        explanation: ['No workspace found!'],
        message: 'Workspace not found!'
      });
    }

    return workspace;
  } catch (error) {
    throw error;
  }
};
