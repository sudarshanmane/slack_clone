import { AppError } from '../utils/errors/appError.js';

const sendDevError = (error, res) => {
  const errorObj = {
    message: error.message,
    success: error.success,
    stackTrace: error.stack,
    err: error
  };

  errorObj.stackTrace = error.stack;
  errorObj.err = error;

  return res.status(error.statusCode || 500).json({
    ...errorObj
  });
};

const sendProdError = (error, res) => {
  const errorObj = {
    message: error.message,
    success: error.success,
    error
  };

  if (error.isOperational) {
    return res.status(error.statusCode || 500).json({
      ...errorObj
    });
  } else {
    return res
      .status(500)
      .json({ message: 'Something went wrong!', success: false, error });
  }
};

const handleCastError = (error) => {
  return new AppError(`Invalid ${error.path}: ${error.value}`, 400);
};

const handleDuplicateKeyError = (error) => {
  const field = Object.keys(error.keyValue)[0];
  const value = error.keyValue[field];

  return new AppError(`Duplicate value for '${field}': '${value}'`, 400);
};

export const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.success = false;

  let err = error.cause || error;

  console.log('err', err.code);

  if (process.env.NODE_ENV !== 'production') {
    sendDevError(error, res);
  } else if (error?.name === 'CastError') {
    err = handleCastError(err);
  } else if (err?.code === 11000) {
    err = handleDuplicateKeyError(err);
  }

  console.log('err', err);

  sendProdError(err, res);
};
