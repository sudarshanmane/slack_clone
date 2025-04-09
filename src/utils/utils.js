import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SCERET } from '../config/serverConfig.js';

export const handleError = (error, res) => {
  if (error.status) {
    return res
      .status(error.status)
      .json({ success: false, message: error.message });
  }

  console.log(error);

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
