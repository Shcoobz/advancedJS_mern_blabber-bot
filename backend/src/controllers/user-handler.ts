import { Response } from 'express';
import { compare, hash } from 'bcrypt';

import { ERROR, SECURITY, SUCCESS } from '../constants/constants.js';
import User from '../models/User.js';

/**
 * Sends a standardized success response with customizable status code.
 */
export function sendSuccessResponse(
  res: Response,
  data: any = {},
  statusCode: number = 200
) {
  const responseData = { message: SUCCESS.RES.OK, ...data };
  const successResponse = res.status(statusCode).json(responseData);

  return successResponse;
}

/**
 * Sends a standardized error response with customizable status code.
 */
export function sendErrorResponse(res: Response, error: Error, statusCode: number = 500) {
  const responseData = { message: ERROR.RES.FAIL, cause: error.message };

  console.log(error);

  if (statusCode === 401) {
    return res
      .status(401)
      .json({ message: ERROR.USER.INCORRECT_PASSWORD, cause: error.message });
  }

  const errorResponse = res.status(500).json(responseData);

  return errorResponse;
}

/**
 * Finds a user by ID.
 */
export async function findUserByID(userId: string) {
  const user = validateUserByID(userId);

  return user;
}

/**
 * Validates if a user exists by ID.
 */
export async function validateUserByID(userId: string) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error(ERROR.USER.NOT_REGISTERED);
  }

  return user;
}

/**
 * Validates if a user exists by email and throws an error if not found.
 */
export async function validateUserByEmail(email: string) {
  const user = await User.findOne({ email });

  return user;
}

/**
 * Verifies if the user's ID matches the one in the JWT.
 */
export function verifyUserPermissions(user: any, jwtUserId: string) {
  if (user._id.toString() !== jwtUserId) {
    throw new Error(ERROR.USER.PERMISSIONS_MISMATCH);
  }
}

/**
 * Hashes the password using bcrypt with predefined salt rounds. This function
 * takes a plain text password and applies a cryptographic hash function to
 * it using bcrypt. The 'SECURITY.BCRYPT_SALT_ROUNDS' constant determines the
 * computational cost of hashing, enhancing security against brute-force attacks.
 */
export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, SECURITY.BCRYPT_SALT_ROUNDS);

  return hashedPassword;
}

/**
 * Checks if a user exists by email or ID, and handles the response based on the context.
 */
export async function checkUserExists(
  identifier: string,
  res: Response,
  isSignup: boolean,
  isByID: boolean = false
) {
  let user;

  if (isByID) {
    user = await validateUserByID(identifier);

    if (!user) {
      sendErrorResponse(res, new Error(ERROR.USER.NOT_REGISTERED), 401);

      return null;
    }
  } else {
    user = await validateUserByEmail(identifier);

    if (isSignup) {
      if (user) {
        sendErrorResponse(res, new Error(ERROR.USER.ALREADY_REGISTERED), 409);

        return null;
      }
    } else {
      if (!user) {
        sendErrorResponse(res, new Error(ERROR.USER.NOT_REGISTERED), 401);

        return null;
      }
    }
  }

  return user;
}

/**
 * Verifies user permissions and sends an error response if the permissions do not match.
 */
export function checkUserPermissions(user: any, jwtUserId: string, res: Response) {
  try {
    verifyUserPermissions(user, jwtUserId);

    return true;
  } catch (error) {
    sendErrorResponse(res, new Error(ERROR.USER.PERMISSIONS_MISMATCH), 403);

    return false;
  }
}

/**
 * Validates the provided password against the stored hashed password.
 */
export async function validatePassword(
  password: string,
  hashedPassword: string,
  res: Response
) {
  const isPasswordCorrect = await compare(password, hashedPassword);

  if (!isPasswordCorrect) {
    sendErrorResponse(res, new Error(ERROR.USER.INCORRECT_PASSWORD), 401);

    return false;
  }

  return true;
}

/**
 * Hashes the given password, creates a new user with the provided details, and saves it to the database.
 */
export async function createAndSaveUser(name: string, email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  return newUser;
}
