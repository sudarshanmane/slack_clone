import { StatusCodes } from 'http-status-codes';

import { customErrorResponse } from '../utils/common/customObjects.js';

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      console.log('------- validation error in zod -------', error);

      const exlplations = [];

      error.errors.forEach((el) => {
        exlplations.push(el.message);
      });

      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: 'ValidationError',
          explanation: exlplations
        })
      );
    }
  };
};
