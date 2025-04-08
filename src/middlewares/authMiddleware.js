import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

import { JWT_SCERET } from '../config/serverConfig.js';
import {
  customErrorResponse,
  internalServerErrorResponse
} from '../utils/common/customObjects.js';

export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Invalid data sent from the client!',
          message: 'No token provided!'
        })
      );
    }

    const response = jwt.verify(token, JWT_SCERET);

    if (!response) {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid token sent from client!',
          explanation: ''
        })
      );
    }

    next();
  } catch (error) {
    console.log('Error whilte authenticating the user', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          message: 'Invalid Token',
          explanation: 'Invalid data sent from the client!'
        })
      );
    } else if (error.name === 'TokenExpiredError') {
      return res.status(StatusCodes.FORBIDDEN).json(
        customErrorResponse({
          explanation: 'Expired token sent from the client!',
          message: 'Session Expired!'
        })
      );
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
