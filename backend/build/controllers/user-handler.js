"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessResponse = sendSuccessResponse;
exports.sendErrorResponse = sendErrorResponse;
exports.validateUserByID = validateUserByID;
exports.validateUserByEmail = validateUserByEmail;
exports.verifyUserPermissions = verifyUserPermissions;
exports.hashPassword = hashPassword;
exports.checkUserExists = checkUserExists;
exports.checkUserPermissions = checkUserPermissions;
exports.validatePassword = validatePassword;
exports.createAndSaveUser = createAndSaveUser;
const constants_js_1 = require("../constants/constants.js");
const User_js_1 = __importDefault(require("../models/User.js"));
const bcrypt_1 = require("bcrypt");
/**
 * Sends a standardized success response with customizable status code.
 * @param {Response} res - The response object.
 * @param {any} data - The data to include in the response.
 * @param {number} [statusCode=200] - The HTTP status code for the response (defaults to 200).
 * @returns {Response} The response object with the success message.
 */
function sendSuccessResponse(res, data = {}, statusCode = 200) {
    const responseData = { message: constants_js_1.SUCCESS.RES.OK, ...data };
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
function sendErrorResponse(res, error, statusCode = 500) {
    const responseData = { message: constants_js_1.ERROR.RES.FAIL, cause: error.message };
    console.log(error);
    if (statusCode === 401) {
        return res
            .status(401)
            .json({ message: constants_js_1.ERROR.USER.INCORRECT_PASSWORD, cause: error.message });
    }
    return res.status(500).json(responseData);
}
/**
 * Validates if a user exists by ID.
 * @param {string} userId - The ID of the user to validate.
 * @returns {Promise<any>} The user if found.
 * @throws {Error} If the user is not found.
 */
async function validateUserByID(userId) {
    const user = await User_js_1.default.findById(userId);
    if (!user) {
        throw new Error(constants_js_1.ERROR.USER.NOT_REGISTERED);
    }
    return user;
}
/**
 * Validates if a user exists by email and throws an error if not found.
 * @param {string} email - The email of the user to validate.
 * @returns {Promise<any>} The user if found.
 */
async function validateUserByEmail(email) {
    const user = await User_js_1.default.findOne({ email });
    return user;
}
/**
 * Verifies if the user's ID matches the one in the JWT.
 * @param {any} user - The user object.
 * @param {string} jwtUserId - The user ID from the JWT.
 * @throws {Error} If the user's ID does not match the one in the JWT.
 */
function verifyUserPermissions(user, jwtUserId) {
    if (user._id.toString() !== jwtUserId) {
        throw new Error(constants_js_1.ERROR.USER.PERMISSIONS_MISMATCH);
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
async function hashPassword(password) {
    const hashedPassword = await (0, bcrypt_1.hash)(password, constants_js_1.SECURITY.BCRYPT_SALT_ROUNDS);
    return hashedPassword;
}
/**
 * Checks if a user exists by email or ID, and handles the response based on the context.
 *
 * This function checks if a user exists in the database by the provided email or ID.
 * For signup: If the user exists, it sends a 409 Conflict error response.
 * For login: If the user does not exist, it sends a 401 Unauthorized error response.
 *
 * @param {string} identifier - The email or ID to check.
 * @param {Response} res - The response object used to send the error response.
 * @param {boolean} isSignup - A flag indicating whether the check is for signup (true) or login (false).
 * @param {boolean} isByID - A flag indicating whether the identifier is an ID (true) or an email (false).
 * @returns {Promise<any>} - Returns the user object if found (for login or by ID), otherwise null.
 */
async function checkUserExists(identifier, res, isSignup, isByID = false) {
    let user;
    if (isByID) {
        user = await validateUserByID(identifier);
        if (!user) {
            sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.NOT_REGISTERED), 401);
            return null;
        }
    }
    else {
        user = await validateUserByEmail(identifier);
        if (isSignup) {
            if (user) {
                sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.ALREADY_REGISTERED), 409);
                return null;
            }
        }
        else {
            if (!user) {
                sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.NOT_REGISTERED), 401);
                return null;
            }
        }
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
function checkUserPermissions(user, jwtUserId, res) {
    try {
        verifyUserPermissions(user, jwtUserId);
        return true;
    }
    catch (error) {
        sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.PERMISSIONS_MISMATCH), 403);
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
async function validatePassword(password, hashedPassword, res) {
    const isPasswordCorrect = await (0, bcrypt_1.compare)(password, hashedPassword);
    if (!isPasswordCorrect) {
        sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.INCORRECT_PASSWORD), 401);
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
async function createAndSaveUser(name, email, password) {
    const hashedPassword = await hashPassword(password);
    const newUser = new User_js_1.default({ name, email, password: hashedPassword });
    await newUser.save();
    return newUser;
}
//# sourceMappingURL=user-handler.js.map