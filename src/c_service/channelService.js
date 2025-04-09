import channelRepository from '../d_repository/channelRepository.js';

export const createChannelServise = async (channelObject) => {
  try {
    const channelObject = await channelRepository.create(channelObject);
    return channelObject;
  } catch (error) {
      
  }
};
