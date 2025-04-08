import ValidationError from '../utils/errors/validationErrors.js';
import { generateJwtToken, validateBcryptPassword } from '../utils/utils.js';
import userRepository from './../d_repository/userRepository.js';

export const signUpService = async (userObject) => {
  try {
    const response = await userRepository.create(userObject);

    const token = generateJwtToken({
      id: response._id,
      username: response.username,
      password: response.password,
      email: response.email
    });

    return {
      response,
      token
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      throw new ValidationError({ error: error.errors }, error.message);
    } else if (error.name === 'MongooseError') {
      throw new ValidationError(
        { error: ['A user with the same email or username alread exists!'] },
        'A user with the same email or username alread exists!'
      );
    }

    throw error;
  }
};

export const userLoginService = async (email, password) => {
  try {
    const userExists = await userRepository.getUserByEmail(email);

    const errorMessage = {
      status: 400,
      message: 'Invalid Credentials!'
    };

    if (!userExists) {
      throw errorMessage;
    }

    const checkPassword = await validateBcryptPassword(
      password,
      userExists.password
    );

    if (!checkPassword) {
      throw { ...errorMessage, message: 'Invalid Password!' };
    } else {
      const token = generateJwtToken({
        id: userExists._id,
        email: userExists.email,
        password: userExists.password,
        username: userExists.username
      });

      return { user: userExists, token };
    }
  } catch (error) {
    throw error;
  }
};

export const findUserByEmailService = async (email) => {
  try {
    const userDoc = await userRepository.getUserByEmail(email);

    if (!userDoc) {
      throw {
        status: 400,
        message: 'User not found!'
      };
    }

    return userDoc;
  } catch (error) {
    throw error;
  }
};

export const findUserByNameSevice = async (name) => {
  try {
    const userDoc = await userRepository.getUserByName(name);
    if (!userDoc) {
      throw {
        status: 400,
        message: 'User not found!'
      };
    }
    return userDoc;
  } catch (error) {
    throw error;
  }
};

export const createUserService = async (user) => {
  try {
    const userDoc = await userRepository.create(user);

    return userDoc;
  } catch (error) {
    throw error;
  }
};

export const getUsersService = async (limit, skip) => {
  try {
    const userDocs = await userRepository.getAll(limit, skip);

    return userDocs;
  } catch (error) {
    throw error;
  }
};

export const findUserByIdService = async (id) => {
  try {
    const userDoc = await userRepository.findById(id);

    if (!userDoc) {
      throw {
        status: 400,
        message: 'User not found!'
      };
    }

    return userDoc;
  } catch (error) {
    throw error;
  }
};

export const updateUserByIdService = async (id, user) => {
  try {
    const userDoc = await userRepository.update(id, user);

    if (!userDoc) {
      throw {
        status: 400,
        message: 'User not found!'
      };
    }

    return userDoc;
  } catch (error) {
    throw error;
  }
};

export const deleteUserByIdService = async (id) => {
  try {
    const delUser = await userRepository.delete(id);
    if (!delUser) {
      throw {
        message: 'User Not Found!',
        status: 400
      };
    }

    return delUser;
  } catch (error) {
    throw error;
  }
};
