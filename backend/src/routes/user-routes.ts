import { Router } from 'express';

import { ROUTE } from '../constants/constants.js';
import { validate, signupValidator, loginValidator } from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js';
import {
  getAllUsers,
  userSignup,
  userLogin,
  verifyUser,
  userLogout,
  getUserData,
} from '../controllers/user-controllers.js';

/**
 * Router for user-related endpoints.
 * Handles various user operations such as authentication, data retrieval, and session management.
 */
const userRoutes = Router();

userRoutes.get(ROUTE.USER.HOME, getAllUsers);
userRoutes.get(ROUTE.USER.AUTH, verifyToken, verifyUser);
userRoutes.get(ROUTE.USER.DATA, verifyToken, getUserData);
userRoutes.get(ROUTE.USER.LOGOUT, verifyToken, userLogout);

userRoutes.post(ROUTE.USER.SIGNUP, validate(signupValidator), userSignup);
userRoutes.post(ROUTE.USER.LOGIN, validate(loginValidator), userLogin);

export default userRoutes;
