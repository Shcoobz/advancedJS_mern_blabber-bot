import { Response } from 'express';

import { ERROR, SECURITY, SUCCESS } from '../constants/constants.js';
import User from '../models/User.js';
import { compare, hash } from 'bcrypt';

/**
 * Sends a standardized success response with customizable status code.
 * @param {Response} res - The response object.
 * @param {any} data - The data to include in the response.
 * @param {number} [statusCode=200] - The HTTP status code for the response (defaults to 200).
 * @returns {Response} The response object with the success message.
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
 * @param {Response} res - The response object.
 * @param {Error} error - The error object.
 * @param {number} [statusCode=500] - The HTTP status code for the response (defaults to 500).
 * @returns {Response} The response object with the error message.
 */
export function sendErrorResponse(res: Response, error: Error, statusCode: number = 500) {
  const responseData = { message: ERROR.RES.FAIL, cause: error.message };

  console.log(error);

  if (statusCode === 401) {
    return res
      .status(401)
      .json({ message: ERROR.USER.INCORRECT_PASSWORD, cause: error.message });
  }

  return res.status(500).json(responseData);
}

/**
 * Validates if a user exists by ID.
 * @param {string} userId - The ID of the user to validate.
 * @returns {Promise<any>} The user if found.
 * @throws {Error} If the user is not found.
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
 * @param {string} email - The email of the user to validate.
 * @returns {Promise<any>} The user if found.
 */
export async function validateUserByEmail(email: string) {
  const user = await User.findOne({ email });

  return user;
}

/**
 * Verifies if the user's ID matches the one in the JWT.
 * @param {any} user - The user object.
 * @param {string} jwtUserId - The user ID from the JWT.
 * @throws {Error} If the user's ID does not match the one in the JWT.
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
 *
 * @param {string} password - The plaintext password to hash.
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 */
export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, SECURITY.BCRYPT_SALT_ROUNDS);

  return hashedPassword;
}

/**
 * Checks if a user with the given email already exists for signup.
 * @param {string} email - The email to check.
 * @param {Response} res - The response object to send back the error response if the user exists.
 * @returns {boolean} - Returns true if the user exists and the response is handled, otherwise false.
 */
export async function checkUserExistsSignup(email: string, res: Response) {
  const user = await validateUserByEmail(email);

  if (user) {
    sendErrorResponse(res, new Error(ERROR.USER.ALREADY_REGISTERED));

    return true;
  }

  return false;
}

/**
 * Checks if a user with the given email already exists for login.
 * @param {string} email - The email to check.
 * @param {Response} res - The response object used to send the error response if the user does not exist.
 * @returns {Promise<any>} - Returns the user object if found, otherwise null.
 */
export async function checkUserExistsLogin(email: string, res: Response) {
  const user = await validateUserByEmail(email);

  if (!user) {
    sendErrorResponse(res, new Error(ERROR.USER.NOT_REGISTERED), 401);

    return null;
  }

  return user;
}

/**
 * Checks if a user with the given ID exists.
 * @param {string} userId - The ID of the user to check.
 * @param {Response} res - The response object used to send the error response if the user does not exist.
 * @returns {Promise<any>} - Returns the user object if found, otherwise null.
 */
export async function checkUserExistsByID(userId: string, res: Response) {
  const user = await validateUserByID(userId);

  if (!user) {
    sendErrorResponse(res, new Error(ERROR.USER.NOT_REGISTERED), 401);
    return null;
  }

  return user;
}

/**
 * Verifies user permissions and sends an error response if the permissions do not match.
 * @param {any} user - The user object.
 * @param {string} jwtUserId - The user ID from the JWT.
 * @param {Response} res - The response object used to send the error response if the permissions do not match.
 * @returns {boolean} - Returns true if permissions match, otherwise false.
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
 * @param {string} password - The plain text password provided by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @param {Response} res - The response object used to send the error response if the password is incorrect.
 * @returns {Promise<boolean>} - Returns true if the password is correct, otherwise false.
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
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The plain text password of the user.
 * @returns {Promise<User>} - The created and saved user object.
 */
export async function createAndSaveUser(name: string, email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  return newUser;
}
