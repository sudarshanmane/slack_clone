import { StatusCodes } from 'http-status-codes';

import {
  createUserService,
  deleteUserByIdService,
  findUserByEmailService,
  findUserByIdService,
  findUserByNameSevice,
  getUsersService,
  signUpService,
  updateUserByIdService,
  userLoginService
} from '../c_service/userServise.js';
import {
  customErrorResponse,
  internalServerErrorResponse,
  successReponse
} from '../utils/common/customObjects.js';
import { handleError } from '../utils/utils.js';

export const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw { status: 400, message: 'Invalid Credentials!' };
    }

    const response = await userLoginService(email, password);

    return res.status(200).json({
      success: true,
      message: 'Loggedin successfully!',
      data: response
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const userSignupController = async (req, res, next) => {
  try {
    const response = await signUpService(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json(successReponse(response, 'User Created Successfully!'));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const getUserByEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmailService(email);

    return res
      .status(200)
      .json({ success: true, message: 'User found successfully!', data: user });
  } catch (error) {
    handleError(error, res);
  }
};

export const findUserByNameController = async (req, res, next) => {
  try {
    const { name } = req.body;

    const user = await findUserByNameSevice(name);

    return res
      .status(200)
      .json({ success: true, message: 'User found successfully!', data: user });
  } catch (error) {
    handleError(error, res);
  }
};

export const createUserController = async (req, res, next) => {
  try {
    const user = await createUserService(req.body);

    return res.status(200).json({
      success: true,
      message: 'User creaed successfully!',
      data: user
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getUsersController = async (req, res, next) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const users = await getUsersService(limit, offset);

    return res.status(200).json({
      success: true,
      message: 'User Details Fetched successfully!',
      data: users
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const getUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const users = await findUserByIdService(id);

    return res.status(200).json({
      success: true,
      message: 'User Details Fetched successfully!',
      data: users
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const deleteUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const users = await deleteUserByIdService(id);

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: users
    });
  } catch (error) {
    handleError(error, res);
  }
};

export const updateUserByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await updateUserByIdService(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'User details updated successfully!',
      data: user
    });
  } catch (error) {
    handleError(error, res);
  }
};
