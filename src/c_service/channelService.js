import channelRepository from '../d_repository/channelRepository.js';
import ClientError from '../utils/errors/clientErrors.js';
import {
  isUserMemberOfWorkspace,
  isWorkspaceExistsFun
} from '../utils/utils.js';

export const getChannelByChannelIdService = async (
  workspaceId,
  userId,
  channelId
) => {
  try {
    const workspace = await isWorkspaceExistsFun(workspaceId);

    isUserMemberOfWorkspace(workspace, userId);

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
