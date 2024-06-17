import { Router } from 'express';
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

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/auth-status', verifyToken, verifyUser);
userRoutes.get('/get-user-data', verifyToken, getUserData);
userRoutes.get('/logout', verifyToken, userLogout);

userRoutes.post('/signup', validate(signupValidator), userSignup);
userRoutes.post('/login', validate(loginValidator), userLogin);

export default userRoutes;
