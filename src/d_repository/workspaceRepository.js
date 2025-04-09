import { StatusCodes } from 'http-status-codes';

import Workspace from '../a_schama/workspaceSchema.js';
import ClientError from '../utils/errors/clientErrors.js';
import channelRepository from './channelRepository.js';
import crudRepository from './crudRepository.js';

const workspaceRepository = {
  ...crudRepository(Workspace),
  getWorspaceByName: async (name) => {
    const workspace = await Workspace.findOne({ name });
    return workspace;
  },
  getWorkspaceByJoinCode: async (joinCode) => {
    const workspace = await Workspace.findOne({ joinCode });
    return workspace;
  },
  addMemberToWorkspace: async (workspaceId, memberId, role) => {
    const workspace = await Workspace.findById(workspaceId);

    if (!workspace) {
      throw new ClientError({
        explanation: ['Invalid data sent from the client!'],
        message: 'Workspace not found!',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isUserAlreadyPartOfWorkspace = workspace.members.find(
      (el) => el.memberId === memberId
    );

    if (isUserAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: ['Invalid data sent from the client!'],
        message: 'Meber is already part of the workspace!',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    workspace.members.push({ memberId, role });

    await workspace.save();

    return workspace;
  },
  addChannelToWorkspace: async (workspaceId, channelName) => {
    const workspace = await Workspace.findById(workspaceId).populate({
      path: 'channels',
      select: 'name'
    });

    if (!workspace) {
      throw new ClientError({
        explanation: ['Invalid data sent by client!'],
        message: 'Workspace not found!',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isChannelAlreadyPartOfWorkspace = workspace.channels.find(
      (el) => el.name === channelName
    );

    if (isChannelAlreadyPartOfWorkspace) {
      throw new ClientError({
        explanation: ['Invalid data sent from client!'],
        message: 'Channel is already part of the workspace!',
        statusCode: StatusCodes.FORBIDDEN
      });
    }

    const channle = await channelRepository.create({ name: channelName });

    workspace.channels.push(channle._id);

    await workspace.save();

    return workspace;
  },

  checkMemberAlreadyAddedInWorkspace: async (workspaceId, memberId) => {
    const workspace = await Workspace.find({
      _id: workspaceId,
      'members.memberId': memberId
    }).select('_id');

    return workspace;
  },
  fetchAllWorkspaceByMemeberId: async (memberId) => {
    const workspaces = await Workspace.find({
      'members.memberId': memberId
    }).populate('members.memberId', '_id username  email avatar');

    return workspaces;
  }
};

export default workspaceRepository;
