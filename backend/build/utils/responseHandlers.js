import { ERROR, SUCCESS } from '../constants/constants.js';
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
//# sourceMappingURL=responseHandlers.js.map