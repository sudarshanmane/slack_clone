import messageRepository from '../d_repository/messageRepository.js';
import {
  isUserMemberOfWorkspace,
  isWorkspaceExistsFun
} from '../utils/utils.js';
import { isChannelExists } from './channelService.js';

export const getAllMessagesOfAchannelAndWorkspaceService = async (
  limit,
  offset,
  userId,
  channelId
) => {
  try {
    // we are alreday checking if the user exists in isAuthenticated

    const channel = await isChannelExists(channelId);

    const workspace = await isWorkspaceExistsFun(channel.workspaceId);

    isUserMemberOfWorkspace(workspace, userId);

    const channelMessages = await messageRepository.getAll(
      limit,
      offset,
      [{ path: 'senderId', select: 'username email avatar' }],
      {
        channelId,
        senderId: userId,
        workspaceId: channel.workspaceId
      }
    );

    return channelMessages;
  } catch (error) {
    throw error;
  }
};

export const createMessageService = async (data) => {
  try {
    let token = data.toekn;

    // if (!token) {
    //   return customErrorResponse({
    //     explanation: 'Invalid data sent by client!',
    //     message: 'Token not provided by user!'
    //   });
    // }

    const response = await messageRepository.create(data);
    return response;
  } catch (error) {
    return error;
  }
};
