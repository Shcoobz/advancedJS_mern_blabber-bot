"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_js_1 = require("../constants/constants.js");
const validators_js_1 = require("../utils/validators.js");
const token_manager_js_1 = require("../utils/token-manager.js");
const user_controllers_js_1 = require("../controllers/user-controllers.js");
/**
 * Router for user-related endpoints.
 * Handles various user operations such as authentication, data retrieval, and session management.
 *
 * Routes:
 * - GET `ROUTE.USER.HOME`: Retrieves all users. No authentication required.
 * - GET `ROUTE.USER.AUTH`: Verifies user authentication. Requires token verification.
 * - GET `ROUTE.USER.DATA`: Retrieves authenticated user's data. Requires token verification.
 * - GET `ROUTE.USER.LOGOUT`: Logs out the user by ending the session. Requires token verification.
 * - POST `ROUTE.USER.SIGNUP`: Registers a new user. Validates input data before processing.
 * - POST `ROUTE.USER.LOGIN`: Authenticates a user and initiates a session. Validates input data.
 */
const userRoutes = (0, express_1.Router)();
userRoutes.get(constants_js_1.ROUTE.USER.HOME, user_controllers_js_1.getAllUsers);
userRoutes.get(constants_js_1.ROUTE.USER.AUTH, token_manager_js_1.verifyToken, user_controllers_js_1.verifyUser);
userRoutes.get(constants_js_1.ROUTE.USER.DATA, token_manager_js_1.verifyToken, user_controllers_js_1.getUserData);
userRoutes.get(constants_js_1.ROUTE.USER.LOGOUT, token_manager_js_1.verifyToken, user_controllers_js_1.userLogout);
userRoutes.post(constants_js_1.ROUTE.USER.SIGNUP, (0, validators_js_1.validate)(validators_js_1.signupValidator), user_controllers_js_1.userSignup);
userRoutes.post(constants_js_1.ROUTE.USER.LOGIN, (0, validators_js_1.validate)(validators_js_1.loginValidator), user_controllers_js_1.userLogin);
exports.default = userRoutes;
//# sourceMappingURL=user-routes.js.map