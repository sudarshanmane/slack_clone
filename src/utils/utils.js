import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_SCERET } from '../config/serverConfig.js';
import ClientError from './errors/clientErrors.js';

export const handleError = (error, res) => {
  if (error.status) {
    return res
      .status(error.status)
      .json({ success: false, message: error.message });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal Server Error!'
  });
};

export const generateJwtToken = (payload) => {
  return jwt.sign(payload, JWT_SCERET, { expiresIn: '100d' });
};

export const verifyJwtToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return { status: 400, message: 'Invalid token' };
  }
};

export const validateBcryptPassword = (password, bcryptedPassword) => {
  const result = bcrypt.compareSync(password, bcryptedPassword);
  return result;
};

export const isUserAdminOfTheWorkspace = (workspace, userId, message) => {
  const reponse = workspace.members.find((el) => {
    return (
      el?.memberId?.toString() === userId?.toString() && el?.role === 'admin'
    );
  });

  if (!reponse) {
    throw new ClientError({
      explanation: ['Invalid data sent by the client!'],
      message: [message || 'U are not allowed to perform this operation!'],
      statusCode: StatusCodes.NOT_ACCEPTABLE
    });
  }

  return reponse;
};
