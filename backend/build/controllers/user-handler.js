import { ERROR, SUCCESS } from '../constants/constants.js';
import User from '../models/User.js';
/**
 * Sends a standardized success response.
 * @param {Response} res - The response object.
 * @param {any} data - The data to include in the response.
 * @returns {Response} The response object with the success message.
 */
export function sendSuccessResponse(res, data = {}) {
    const responseData = { message: SUCCESS.RES.OK, ...data };
    const successResponse = res.status(200).json(responseData);
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
export async function validateUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error(ERROR.USER.NOT_REGISTERED);
    }
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
//# sourceMappingURL=user-handler.js.map