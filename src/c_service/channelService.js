import channelRepository from '../d_repository/channelRepository.js';
import messageRepository from '../d_repository/messageRepository.js';
import ClientError from '../utils/errors/clientErrors.js';
import {
  isUserMemberOfWorkspace,
  isWorkspaceExistsFun
} from '../utils/utils.js';

export const isChannelExists = async (channelId) => {
  try {
    const channel = await channelRepository.findById(channelId, [
      { path: 'workspaceId', select: 'name' }
    ]);

    if (!channel) {
      throw ClientError({
        explanation: 'Invalid data sent by client!',
        message: 'Channel does not exists!'
      });
    }

    return channel;
  } catch (error) {
    throw error;
  }
};

export const getChannelMessagesByChannelIdService = async (
  workspaceId,
  userId,
  channelId
) => {
  try {
    const channel = await isChannelExists(channelId);

    const workspace = await isWorkspaceExistsFun(workspaceId);

    isUserMemberOfWorkspace(workspace, userId);

    const messages = await messageRepository.getAll(20, 0, [], {
      channelId: channelId
    });

    return { ...channel._doc, messages };
  } catch (error) {
    throw error;
  }
};
