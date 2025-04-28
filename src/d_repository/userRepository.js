import User from '../a_schama/userSchema.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),

  getUserByEmail: async function (email) {
    const userDoc = await User.findOne({ email }).select('+password');
    return userDoc;
  },

  getUserByName: async function (username) {
    const userDoc = await User.findOne({ username });
    return userDoc;
  }
};

export default userRepository;
