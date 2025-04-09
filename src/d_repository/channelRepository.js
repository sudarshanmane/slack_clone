import Channel from '../a_schama/channelSchema.js';
import crudRepository from './crudRepository.js';

const channelRepository = {
  ...crudRepository(Channel)
};

export default channelRepository;
