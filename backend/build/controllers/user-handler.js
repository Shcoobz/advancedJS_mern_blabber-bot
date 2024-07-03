"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessResponse = sendSuccessResponse;
exports.sendErrorResponse = sendErrorResponse;
exports.findUserByID = findUserByID;
exports.validateUserByID = validateUserByID;
exports.validateUserByEmail = validateUserByEmail;
exports.verifyUserPermissions = verifyUserPermissions;
exports.hashPassword = hashPassword;
exports.checkUserExists = checkUserExists;
exports.checkUserPermissions = checkUserPermissions;
exports.validatePassword = validatePassword;
exports.createAndSaveUser = createAndSaveUser;
const bcrypt_1 = require("bcrypt");
const constants_js_1 = require("../constants/constants.js");
const User_js_1 = __importDefault(require("../models/User.js"));
/**
 * Sends a standardized success response with customizable status code.
 */
function sendSuccessResponse(res, data = {}, statusCode = 200) {
    const responseData = { message: constants_js_1.SUCCESS.RES.OK, ...data };
    const successResponse = res.status(statusCode).json(responseData);
    return successResponse;
}
/**
 * Sends a standardized error response with customizable status code.
 */
function sendErrorResponse(res, error, statusCode = 500) {
    const responseData = { message: constants_js_1.ERROR.RES.FAIL, cause: error.message };
    console.log(error);
    if (statusCode === 401) {
        return res
            .status(401)
            .json({ message: constants_js_1.ERROR.USER.UNAUTHORIZED, cause: error.message });
    }
    const errorResponse = res.status(500).json(responseData);
    return errorResponse;
}
/**
 * Finds a user by ID.
 */
async function findUserByID(userId) {
    const user = validateUserByID(userId);
    return user;
}
/**
 * Validates if a user exists by ID.
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
 */
async function validateUserByEmail(email) {
    const user = await User_js_1.default.findOne({ email });
    return user;
}
/**
 * Verifies if the user's ID matches the one in the JWT.
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
 */
async function hashPassword(password) {
    const hashedPassword = await (0, bcrypt_1.hash)(password, constants_js_1.SECURITY.BCRYPT_SALT_ROUNDS);
    return hashedPassword;
}
/**
 * Checks if a user exists by email or ID, and handles the response based on the context.
 */
async function checkUserExists(identifier, isSignup, isByID = false) {
    let user;
    if (isByID) {
        user = await validateUserByID(identifier);
        if (!user) {
            throw new Error(constants_js_1.ERROR.USER.NOT_REGISTERED);
        }
    }
    else {
        user = await validateUserByEmail(identifier);
        if (isSignup) {
            if (user) {
                throw new Error(constants_js_1.ERROR.USER.ALREADY_REGISTERED);
            }
        }
        else {
            if (!user) {
                throw new Error(constants_js_1.ERROR.USER.NOT_REGISTERED);
            }
        }
    }
    return user;
}
/**
 * Verifies user permissions and sends an error response if the permissions do not match.
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
 */
async function validatePassword(password, hashedPassword) {
    const isPasswordCorrect = await (0, bcrypt_1.compare)(password, hashedPassword);
    if (!isPasswordCorrect) {
        throw new Error(constants_js_1.ERROR.USER.UNAUTHORIZED);
    }
    return true;
}
/**
 * Hashes the given password, creates a new user with the provided details, and saves it to the database.
 */
async function createAndSaveUser(name, email, password) {
    const hashedPassword = await hashPassword(password);
    const newUser = new User_js_1.default({ name, email, password: hashedPassword });
    await newUser.save();
    return newUser;
}
//# sourceMappingURL=user-handler.js.map