"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = getAllUsers;
exports.userSignup = userSignup;
exports.userLogin = userLogin;
exports.userLogout = userLogout;
exports.verifyUser = verifyUser;
exports.getUserData = getUserData;
const cookie_manager_js_1 = require("../utils/cookie-manager.js");
const constants_js_1 = require("../constants/constants.js");
const user_handler_js_1 = require("./user-handler.js");
const User_js_1 = __importDefault(require("../models/User.js"));
/**
 * Fetches all users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - A response with all users or an error message.
 */
async function getAllUsers(req, res, next) {
    try {
        const users = await User_js_1.default.find();
        return (0, user_handler_js_1.sendSuccessResponse)(res, { users });
    }
    catch (error) {
        console.log(error);
        return (0, user_handler_js_1.sendErrorResponse)(res, error);
    }
}
/**
 * Handles the user signup process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
async function userSignup(req, res, next) {
    try {
        const { name, email, password } = req.body;
        if (await (0, user_handler_js_1.checkUserExists)(email, res, true, false)) {
            return;
        }
        const newUser = await (0, user_handler_js_1.createAndSaveUser)(name, email, password);
        (0, cookie_manager_js_1.handleUserCookie)(res, newUser);
        return (0, user_handler_js_1.sendSuccessResponse)(res, {
            message: constants_js_1.SUCCESS.USER.REGISTRATION,
            name: newUser.name,
            email: newUser.email,
        }, 201);
    }
    catch (error) {
        console.log(error);
        return (0, user_handler_js_1.sendErrorResponse)(res, error);
    }
}
/**
 * Handles the user login process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
async function userLogin(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await (0, user_handler_js_1.checkUserExists)(email, res, false, false);
        if (!user)
            return;
        if (!(await (0, user_handler_js_1.validatePassword)(password, user.password, res))) {
            return;
        }
        (0, cookie_manager_js_1.handleUserCookie)(res, user);
        return (0, user_handler_js_1.sendSuccessResponse)(res, {
            message: constants_js_1.SUCCESS.USER.LOGIN,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return (0, user_handler_js_1.sendErrorResponse)(res, error);
    }
}
/**
 * Handles the user logout process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
async function userLogout(req, res, next) {
    try {
        const user = await await (0, user_handler_js_1.checkUserExists)(res.locals.jwtData.id, res, false, true);
        if (!user)
            return;
        if (!(0, user_handler_js_1.checkUserPermissions)(user, res.locals.jwtData.id, res)) {
            return;
        }
        (0, cookie_manager_js_1.deleteCookie)(res);
        return (0, user_handler_js_1.sendSuccessResponse)(res, {
            message: constants_js_1.SUCCESS.USER.LOGOUT,
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return (0, user_handler_js_1.sendErrorResponse)(res, error);
    }
}
/**
 * Verifies if the user is authenticated based on the JWT data.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
async function verifyUser(req, res, next) {
    try {
        const user = await (0, user_handler_js_1.checkUserExists)(res.locals.jwtData.id, res, false, true);
        if (!user)
            return;
        if (!(0, user_handler_js_1.checkUserPermissions)(user, res.locals.jwtData.id, res))
            return;
        return (0, user_handler_js_1.sendSuccessResponse)(res, {
            isAuthenticated: true,
        });
    }
    catch (error) {
        console.log(error);
        return (0, user_handler_js_1.sendErrorResponse)(res, error);
    }
}
/**
 * Retrieves user data and sends a success response with user email and name.
 * @async
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
async function getUserData(req, res) {
    try {
        const user = await (0, user_handler_js_1.checkUserExists)(res.locals.jwtData.id, res, false, true);
        if (!user)
            return;
        return (0, user_handler_js_1.sendSuccessResponse)(res, {
            email: user.email,
            name: user.name,
        });
    }
    catch (error) {
        console.error(error);
        return (0, user_handler_js_1.sendErrorResponse)(res, error);
    }
}
//# sourceMappingURL=user-controllers.js.map