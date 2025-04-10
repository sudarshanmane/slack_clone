import { StatusCodes } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';

import channelRepository from '../d_repository/channelRepository.js';
import userRepository from '../d_repository/userRepository.js';
import workspaceRepository from '../d_repository/workspaceRepository.js';
import { customErrorResponse } from '../utils/common/customObjects.js';
import ClientError from '../utils/errors/clientErrors.js';
import ValidationError from '../utils/errors/validationErrors.js';
import { isUserAdminOfTheWorkspace } from '../utils/utils.js';

const isWorkspaceExistsFun = async (workspaceId) => {
  const workspace = await workspaceRepository.findById(workspaceId);

  if (!workspace) {
    throw new ClientError({
      explanation: 'Invalid data sent from the client!',
      message: 'Workspace not found',
      statusCode: StatusCodes.NOT_FOUND
    });
  }

  return workspace;
};

const isUserMemberOfWorkspace = (workspace, userId) => {
  const isMember = workspace.members.find((el) => {
    return el?.memberId.toString() === userId.toString();
  });

  if (!isMember) {
    throw new ClientError({
      explanation: 'User not part of the workspace!',
      message: 'U are not part of the workspace!',
      statusCodes: StatusCodes.UNAUTHORIZED
    });
  }
};

export const getALLWorkSpaceService = async (limit, offset) => {
  try {
    const worspaceces = await workspaceRepository.getAll(limit, offset, [
      { path: 'channels' },
      { path: 'members' }
    ]);
    return worspaceces;
  } catch (error) {
    throw error;
  }
};

export const getUserWorkspacesService = async (workspaceId, userId) => {
  try {
    const workspace = await isWorkspaceExistsFun(workspaceId);

    isUserMemberOfWorkspace(workspace, userId);

    return workspace;
  } catch (error) {
    throw error;
  }
};

export const createWorkspceSpaceService = async (workspaceObj) => {
  try {
    const joinCode = uuidv4().substring(0, 6);

    const workspace = await workspaceRepository.create({
      ...workspaceObj,
      joinCode
    });

    let updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
      workspace._id,
      'general'
    );
    return updatedWorkspace;
  } catch (error) {
    console.log('error while creating tbe workspace!', error);
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
  role,
  userId
) => {
  try {
    const workspace = await isWorkspaceExistsFun(workSpaceId);

    const memberCheck = await userRepository.findById(memberId);

    if (!memberCheck) {
      throw new ClientError({
        statusCode: StatusCodes.NOT_FOUND,
        explanation: ['Provided incorrect member details!'],
        message: 'Member not found!'
      });
    }

    isUserAdminOfTheWorkspace(workspace, userId);

    const isUserAlreadyPartOfWorkspace = workspace.members.find(
      (el) => el.memberId === memberId
    );

    if (isUserAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: ['Invalid data sent from the client!'],
        message: 'Member is already part of the workspace!',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const updatedWorkspace = await workspaceRepository.addMemberToWorkspace(
      workspace,
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
  channelName,
  userId
) => {
  try {
    const updatedWorkspace = await workspaceRepository.addChannelToWorkspace(
      workSpaceId,
      channelName,
      userId
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

export const findAllWorkspaceByMembersService = async (memberId) => {
  try {
    const workspaces =
      await workspaceRepository.fetchAllWorkspaceByMemeberId(memberId);

    return workspaces;
  } catch (error) {
    console.log('error occurred in findAllWorkspaceByMembers', error);
    throw error;
  }
};

export const deleteWorkspaceService = async (userId, workspaceId) => {
  try {
    const workspace = await workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        message: 'Worksapce Not found!',
        explanation: 'Invalid Data Sent By Client!'
      });
    }

    await isUserAdminOfTheWorkspace(workspace, userId);

    const deletedChannles = await channelRepository.deleteMany(
      workspace.channels
    );

    const response = await workspaceRepository.delete(workspaceId);

    if (!response) {
      throw new ClientError({
        explanation: 'Invalid data sent by client!',
        message: 'Workspace not found!',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return { deletedChannles, workspace };
  } catch (error) {
    throw error;
  }
};
