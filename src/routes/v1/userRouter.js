import express from 'express';

import {
  getUsersController,
  userLoginController,
  userSignupController
} from '../../b_controllers/userController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
import { signinSchema } from '../../validators/signinSchema.js';
import { userSignUpSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const userRouter = express.Router();

userRouter.post('/login', validate(signinSchema), userLoginController);
userRouter.post('/signup', validate(userSignUpSchema), userSignupController);

userRouter.route('/').get(isAuthenticated, getUsersController);

export default userRouter;
