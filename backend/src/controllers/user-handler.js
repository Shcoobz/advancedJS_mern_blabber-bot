"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.createAndSaveUser = exports.validatePassword = exports.checkUserPermissions = exports.checkUserExists = exports.hashPassword = exports.verifyUserPermissions = exports.validateUserByEmail = exports.validateUserByID = exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
var constants_js_1 = require("../constants/constants.js");
var User_js_1 = require("../models/User.js");
var bcrypt_1 = require("bcrypt");
/**
 * Sends a standardized success response with customizable status code.
 * @param {Response} res - The response object.
 * @param {any} data - The data to include in the response.
 * @param {number} [statusCode=200] - The HTTP status code for the response (defaults to 200).
 * @returns {Response} The response object with the success message.
 */
function sendSuccessResponse(res, data, statusCode) {
    if (data === void 0) { data = {}; }
    if (statusCode === void 0) { statusCode = 200; }
    var responseData = __assign({ message: constants_js_1.SUCCESS.RES.OK }, data);
    var successResponse = res.status(statusCode).json(responseData);
    return successResponse;
}
exports.sendSuccessResponse = sendSuccessResponse;
/**
 * Sends a standardized error response with customizable status code.
 * @param {Response} res - The response object.
 * @param {Error} error - The error object.
 * @param {number} [statusCode=500] - The HTTP status code for the response (defaults to 500).
 * @returns {Response} The response object with the error message.
 */
function sendErrorResponse(res, error, statusCode) {
    if (statusCode === void 0) { statusCode = 500; }
    var responseData = { message: constants_js_1.ERROR.RES.FAIL, cause: error.message };
    console.log(error);
    if (statusCode === 401) {
        return res
            .status(401)
            .json({ message: constants_js_1.ERROR.USER.INCORRECT_PASSWORD, cause: error.message });
    }
    return res.status(500).json(responseData);
}
exports.sendErrorResponse = sendErrorResponse;
/**
 * Validates if a user exists by ID.
 * @param {string} userId - The ID of the user to validate.
 * @returns {Promise<any>} The user if found.
 * @throws {Error} If the user is not found.
 */
function validateUserByID(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_js_1.default.findById(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        throw new Error(constants_js_1.ERROR.USER.NOT_REGISTERED);
                    }
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.validateUserByID = validateUserByID;
/**
 * Validates if a user exists by email and throws an error if not found.
 * @param {string} email - The email of the user to validate.
 * @returns {Promise<any>} The user if found.
 */
function validateUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_js_1.default.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
exports.validateUserByEmail = validateUserByEmail;
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
exports.verifyUserPermissions = verifyUserPermissions;
/**
 * Hashes the password using bcrypt with predefined salt rounds. This function
 * takes a plain text password and applies a cryptographic hash function to
 * it using bcrypt. The 'SECURITY.BCRYPT_SALT_ROUNDS' constant determines the
 * computational cost of hashing, enhancing security against brute-force attacks.
 *
 * @param {string} password - The plaintext password to hash.
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 */
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, bcrypt_1.hash)(password, constants_js_1.SECURITY.BCRYPT_SALT_ROUNDS)];
                case 1:
                    hashedPassword = _a.sent();
                    return [2 /*return*/, hashedPassword];
            }
        });
    });
}
exports.hashPassword = hashPassword;
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
function checkUserExists(identifier_1, res_1, isSignup_1) {
    return __awaiter(this, arguments, void 0, function (identifier, res, isSignup, isByID) {
        var user;
        if (isByID === void 0) { isByID = false; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isByID) return [3 /*break*/, 2];
                    return [4 /*yield*/, validateUserByID(identifier)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.NOT_REGISTERED), 401);
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, validateUserByEmail(identifier)];
                case 3:
                    user = _a.sent();
                    if (isSignup) {
                        if (user) {
                            sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.ALREADY_REGISTERED), 409);
                            return [2 /*return*/, null];
                        }
                    }
                    else {
                        if (!user) {
                            sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.NOT_REGISTERED), 401);
                            return [2 /*return*/, null];
                        }
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/, user];
            }
        });
    });
}
exports.checkUserExists = checkUserExists;
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
exports.checkUserPermissions = checkUserPermissions;
/**
 * Validates the provided password against the stored hashed password.
 * @param {string} password - The plain text password provided by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @param {Response} res - The response object used to send the error response if the password is incorrect.
 * @returns {Promise<boolean>} - Returns true if the password is correct, otherwise false.
 */
function validatePassword(password, hashedPassword, res) {
    return __awaiter(this, void 0, void 0, function () {
        var isPasswordCorrect;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, bcrypt_1.compare)(password, hashedPassword)];
                case 1:
                    isPasswordCorrect = _a.sent();
                    if (!isPasswordCorrect) {
                        sendErrorResponse(res, new Error(constants_js_1.ERROR.USER.INCORRECT_PASSWORD), 401);
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.validatePassword = validatePassword;
/**
 * Hashes the given password, creates a new user with the provided details, and saves it to the database.
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The plain text password of the user.
 * @returns {Promise<User>} - The created and saved user object.
 */
function createAndSaveUser(name, email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, hashPassword(password)];
                case 1:
                    hashedPassword = _a.sent();
                    newUser = new User_js_1.default({ name: name, email: email, password: hashedPassword });
                    return [4 /*yield*/, newUser.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, newUser];
            }
        });
    });
}
exports.createAndSaveUser = createAndSaveUser;
