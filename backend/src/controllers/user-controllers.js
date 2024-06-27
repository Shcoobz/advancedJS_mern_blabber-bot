"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = exports.verifyUser = exports.userLogout = exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
var cookie_manager_js_1 = require("../utils/cookie-manager.js");
var constants_js_1 = require("../constants/constants.js");
var user_handler_js_1 = require("./user-handler.js");
var User_js_1 = require("../models/User.js");
/**
 * Fetches all users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} - A response with all users or an error message.
 */
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, User_js_1.default.find()];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, (0, user_handler_js_1.sendSuccessResponse)(res, { users: users })];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/, (0, user_handler_js_1.sendErrorResponse)(res, error_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
/**
 * Handles the user signup process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
function userSignup(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name_1, email, password, newUser, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, name_1 = _a.name, email = _a.email, password = _a.password;
                    return [4 /*yield*/, (0, user_handler_js_1.checkUserExists)(email, res, true, false)];
                case 1:
                    if (_b.sent()) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, user_handler_js_1.createAndSaveUser)(name_1, email, password)];
                case 2:
                    newUser = _b.sent();
                    (0, cookie_manager_js_1.handleUserCookie)(res, newUser);
                    return [2 /*return*/, (0, user_handler_js_1.sendSuccessResponse)(res, {
                            message: constants_js_1.SUCCESS.USER.REGISTRATION,
                            name: newUser.name,
                            email: newUser.email,
                        }, 201)];
                case 3:
                    error_2 = _b.sent();
                    console.log(error_2);
                    return [2 /*return*/, (0, user_handler_js_1.sendErrorResponse)(res, error_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.userSignup = userSignup;
/**
 * Handles the user login process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
function userLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, (0, user_handler_js_1.checkUserExists)(email, res, false, false)];
                case 1:
                    user = _b.sent();
                    if (!user)
                        return [2 /*return*/];
                    return [4 /*yield*/, (0, user_handler_js_1.validatePassword)(password, user.password, res)];
                case 2:
                    if (!(_b.sent())) {
                        return [2 /*return*/];
                    }
                    (0, cookie_manager_js_1.handleUserCookie)(res, user);
                    return [2 /*return*/, (0, user_handler_js_1.sendSuccessResponse)(res, {
                            message: constants_js_1.SUCCESS.USER.LOGIN,
                            name: user.name,
                            email: user.email,
                        })];
                case 3:
                    error_3 = _b.sent();
                    console.log(error_3);
                    return [2 /*return*/, (0, user_handler_js_1.sendErrorResponse)(res, error_3)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.userLogin = userLogin;
/**
 * Handles the user logout process.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} - A promise that resolves to void.
 */
function userLogout(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, (0, user_handler_js_1.checkUserExists)(res.locals.jwtData.id, res, false, true)];
                case 1: return [4 /*yield*/, _a.sent()];
                case 2:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/];
                    if (!(0, user_handler_js_1.checkUserPermissions)(user, res.locals.jwtData.id, res)) {
                        return [2 /*return*/];
                    }
                    (0, cookie_manager_js_1.deleteCookie)(res);
                    return [2 /*return*/, (0, user_handler_js_1.sendSuccessResponse)(res, {
                            message: constants_js_1.SUCCESS.USER.LOGOUT,
                            name: user.name,
                            email: user.email,
                        })];
                case 3:
                    error_4 = _a.sent();
                    console.log(error_4);
                    return [2 /*return*/, (0, user_handler_js_1.sendErrorResponse)(res, error_4)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.userLogout = userLogout;
/**
 * Verifies if the user is authenticated based on the JWT data.
 * @param {Request} req - The request object containing the user details.
 * @param {Response} res - The response object used to send the response.
 * @param {NextFunction} next - The next middleware function in the stack.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
function verifyUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, user_handler_js_1.checkUserExists)(res.locals.jwtData.id, res, false, true)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/];
                    if (!(0, user_handler_js_1.checkUserPermissions)(user, res.locals.jwtData.id, res))
                        return [2 /*return*/];
                    return [2 /*return*/, (0, user_handler_js_1.sendSuccessResponse)(res, {
                            isAuthenticated: true,
                        })];
                case 2:
                    error_5 = _a.sent();
                    console.log(error_5);
                    return [2 /*return*/, (0, user_handler_js_1.sendErrorResponse)(res, error_5)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.verifyUser = verifyUser;
/**
 * Retrieves user data and sends a success response with user email and name.
 * @async
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
function getUserData(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, user_handler_js_1.checkUserExists)(res.locals.jwtData.id, res, false, true)];
                case 1:
                    user = _a.sent();
                    if (!user)
                        return [2 /*return*/];
                    return [2 /*return*/, (0, user_handler_js_1.sendSuccessResponse)(res, {
                            email: user.email,
                            name: user.name,
                        })];
                case 2:
                    error_6 = _a.sent();
                    console.error(error_6);
                    return [2 /*return*/, (0, user_handler_js_1.sendErrorResponse)(res, error_6)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserData = getUserData;
