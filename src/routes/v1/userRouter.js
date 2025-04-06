import express from 'express';
import { StatusCodes } from 'http-status-codes';

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  return res.status(StatusCodes.OK).json({ success: true });
});

export default userRouter;
