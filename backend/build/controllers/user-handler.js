import { ERROR, SECURITY, SUCCESS } from '../constants/constants.js';
import User from '../models/User.js';
import { hash } from 'bcrypt';
/**
 * Sends a standardized success response with customizable status code.
 * @param {Response} res - The response object.
 * @param {any} data - The data to include in the response.
 * @param {number} [statusCode=200] - The HTTP status code for the response (defaults to 200).
 * @returns {Response} The response object with the success message.
 */
export function sendSuccessResponse(res, data = {}, statusCode = 200) {
    const responseData = { message: SUCCESS.RES.OK, ...data };
    const successResponse = res.status(statusCode).json(responseData);
    return successResponse;
}
/**
 * Sends a standardized error response.
 * @param {Response} res - The response object.
 * @param {Error} error - The error object.
 * @returns {Response} The response object with the error message.
 */
export function sendErrorResponse(res, error) {
    const responseData = { message: ERROR.RES.FAIL, cause: error.message };
    console.log(error);
    const errorResponse = res.status(500).json(responseData);
    return errorResponse;
}
/**
 * Validates if a user exists by ID.
 * @param {string} userId - The ID of the user to validate.
 * @returns {Promise<any>} The user if found.
 * @throws {Error} If the user is not found.
 */
export async function validateUserByID(userId) {
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
export async function validateUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
}
/**
 * Verifies if the user's ID matches the one in the JWT.
 * @param {any} user - The user object.
 * @param {string} jwtUserId - The user ID from the JWT.
 * @throws {Error} If the user's ID does not match the one in the JWT.
 */
export function verifyUserPermissions(user, jwtUserId) {
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
export async function hashPassword(password) {
    const hashedPassword = await hash(password, SECURITY.BCRYPT_SALT_ROUNDS);
    return hashedPassword;
}
/**
 * Checks if a user with the given email already exists.
 * @param {string} email - The email to check.
 * @param {Response} res - The response object to send back the error response if the user exists.
 * @returns {boolean} - Returns true if the user exists and the response is handled, otherwise false.
 */
export async function checkUserExists(email, res) {
    const existingUser = await validateUserByEmail(email);
    if (existingUser) {
        sendErrorResponse(res, new Error(ERROR.USER.ALREADY_REGISTERED));
        return true;
    }
    return false;
}
/**
 * Hashes the given password, creates a new user with the provided details, and saves it to the database.
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The plain text password of the user.
 * @returns {Promise<User>} - The created and saved user object.
 */
export async function createAndSaveUser(name, email, password) {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return newUser;
}
//# sourceMappingURL=user-handler.js.map