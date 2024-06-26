import { Request, Response, NextFunction } from 'express';

import { deleteCookie, handleUserCookie } from '../utils/cookie-manager.js';
import { SUCCESS } from '../constants/constants.js';
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
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - A response with all users or an error message.
 */
export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.find();

    return sendSuccessResponse(res, { users });
  } catch (error) {
    console.log(error);

    return sendErrorResponse(res, error);
  }
}

/**
 * Handles the user signup process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export async function userSignup(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body;

    if (await checkUserExists(email, res, true, false)) {
      return;
    }

    const newUser = await createAndSaveUser(name, email, password);

    handleUserCookie(res, newUser);

    return sendSuccessResponse(
      res,
      {
        message: SUCCESS.USER.REGISTRATION,
        name: newUser.name,
        email: newUser.email,
      },
      201
    );
  } catch (error) {
    console.log(error);

    return sendErrorResponse(res, error);
  }
}

/**
 * Handles the user login process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export async function userLogin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await checkUserExists(email, res, false, false);
    if (!user) return;

    if (!(await validatePassword(password, user.password, res))) {
      return;
    }

    handleUserCookie(res, user);

    return sendSuccessResponse(res, {
      message: SUCCESS.USER.LOGIN,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);

    return sendErrorResponse(res, error);
  }
}

/**
 * Handles the user logout process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
export async function userLogout(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await await checkUserExists(res.locals.jwtData.id, res, false, true);

    if (!user) return;

    if (!checkUserPermissions(user, res.locals.jwtData.id, res)) {
      return;
    }

    deleteCookie(res);

    return sendSuccessResponse(res, {
      message: SUCCESS.USER.LOGOUT,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);

    return sendErrorResponse(res, error);
  }
}

/**
 * Verifies if the user is authenticated based on the JWT data.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await checkUserExists(res.locals.jwtData.id, res, false, true);

    if (!user) return;

    if (!checkUserPermissions(user, res.locals.jwtData.id, res)) return;

    return sendSuccessResponse(res, {
      isAuthenticated: true,
    });
  } catch (error) {
    console.log(error);

    return sendErrorResponse(res, error);
  }
}

/**
 * Retrieves user data and sends a success response with user email and name.
 * @async
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function getUserData(req: Request, res: Response) {
  try {
    const user = await checkUserExists(res.locals.jwtData.id, res, false, true);

    if (!user) return;

    return sendSuccessResponse(res, {
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error(error);

    return sendErrorResponse(res, error);
  }
}
