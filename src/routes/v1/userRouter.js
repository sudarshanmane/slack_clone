import express from 'express';

import {
  getUsersController,
  userLoginController,
  userSignupController
} from '../../b_controllers/userController.js';
import { userSignUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const userRouter = express.Router();

userRouter.post('/login', userLoginController);
userRouter.post('/signup', validate(userSignUpSchema), userSignupController);

userRouter.route('/').get(getUsersController);

export default userRouter;
