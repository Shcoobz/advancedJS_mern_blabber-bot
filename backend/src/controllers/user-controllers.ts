import { Request, Response, NextFunction } from 'express';

import { deleteCookie, handleUserCookie } from '../utils/cookie-manager.js';
import { ERROR, SUCCESS } from '../constants/constants.js';
import {
  checkUserExists,
  checkUserPermissions,
  createAndSaveUser,
  sendErrorResponse,
  sendSuccessResponse,
  validatePassword,
} from './user-handler.js';

import User from '../models/User.js';

/**
 * Fetches all users from the database.
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();

    const successResponse = sendSuccessResponse(res, { users });

    return successResponse;
  } catch (error) {
    console.log(error);

    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}

/**
 * Handles the user signup process.
 */
export async function userSignup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;

    if (await checkUserExists(email, res, true, false)) {
      return;
    }

    const newUser = await createAndSaveUser(name, email, password);

    handleUserCookie(res, newUser);

    const successResponse = sendSuccessResponse(
      res,
      {
        message: SUCCESS.USER.REGISTRATION,
        name: newUser.name,
        email: newUser.email,
      },
      201
    );

    return successResponse;
  } catch (error) {
    console.log(error);

    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}

/**
 * Handles the user login process.
 */
export async function userLogin(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('Login request received:', req.body);
    const { email, password } = req.body;

    const user = await checkUserExists(email, res, false, false);

    console.log('Login attempt for email:', email);
    console.log('User found:', !!user);
    console.log(
      'Password validation result:',
      await validatePassword(password, user.password, res)
    );

    if (!user) {
      console.log('User not found, sending error response.');
      return sendErrorResponse(res, new Error('User not found'), 404);
    }

    // Validate password once
    const passwordIsValid = await validatePassword(password, user.password, res);
    console.log('Password validation result:', passwordIsValid);

    if (!passwordIsValid) {
      console.log('Invalid password, sending error response.');
      return sendErrorResponse(res, new Error('Invalid password'), 401);
    }

    handleUserCookie(res, user);

    const successResponse = sendSuccessResponse(res, {
      message: SUCCESS.USER.LOGIN,
      name: user.name,
      email: user.email,
    });

    return successResponse;
  } catch (error) {
    console.log(error);

    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}

/**
 * Handles the user logout process.
 */
export async function userLogout(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await checkUserExists(res.locals.jwtData.id, res, false, true);

    if (!user) return;

    if (!checkUserPermissions(user, res.locals.jwtData.id, res)) {
      return;
    }

    deleteCookie(res);

    const successResponse = sendSuccessResponse(res, {
      message: SUCCESS.USER.LOGOUT,
      name: user.name,
      email: user.email,
    });

    return successResponse;
  } catch (error) {
    console.log(error);

    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}

/**
 * Verifies if the user is authenticated based on the JWT data.
 */
export async function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await checkUserExists(res.locals.jwtData.id, res, false, true);

    if (!user) return;

    if (!checkUserPermissions(user, res.locals.jwtData.id, res)) {
      return;
    }

    const successResponse = sendSuccessResponse(res, {
      isAuthenticated: true,
    });

    return successResponse;
  } catch (error) {
    console.log(error);

    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}

/**
 * Retrieves user data and sends a success response with user email and name.
 */
export async function getUserData(req: Request, res: Response) {
  try {
    const user = await checkUserExists(res.locals.jwtData.id, res, false, true);

    if (!user) return;

    const successResponse = sendSuccessResponse(res, {
      email: user.email,
      name: user.name,
    });

    return successResponse;
  } catch (error) {
    console.error(error);

    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}
