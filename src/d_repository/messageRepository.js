import Message from '../a_schama/messageSchema.js';
import crudRepository from './crudRepository.js';

const messageRepository = {
  ...crudRepository(Message)
};

export default messageRepository;
