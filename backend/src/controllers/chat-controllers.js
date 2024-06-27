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
exports.deleteChats = exports.sendChatsToUser = exports.generateChatCompletion = void 0;
var openai_1 = require("openai");
var openai_config_js_1 = require("../config/openai-config.js");
var constants_js_1 = require("../constants/constants.js");
var user_handler_js_1 = require("./user-handler.js");
/**
 * Gets the chats of a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<any[]>} The chats of the user.
 */
function getUserChats(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, chats;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, user_handler_js_1.validateUserByID)(userId)];
                case 1:
                    user = _a.sent();
                    chats = user.chats;
                    return [2 /*return*/, chats];
            }
        });
    });
}
/**
 * Prepares the chat messages by adding a new user message.
 * @param {any} user - The user object.
 * @param {string} message - The new message content.
 * @returns {ChatCompletionRequestMessage[]} The prepared chat messages.
 */
function prepareChats(user, message) {
    var chats = user.chats.map(function (_a) {
        var role = _a.role, content = _a.content;
        return ({
            role: role,
            content: content,
        });
    });
    chats.push({ content: message, role: constants_js_1.ROLE.USER });
    user.chats.push({ content: message, role: constants_js_1.ROLE.USER });
    return chats;
}
/**
 * Sends chat messages to OpenAI and gets the response.
 * @param {ChatCompletionRequestMessage[]} chats - The chat messages.
 * @returns {Promise<string>} The response message from OpenAI.
 */
function sendToOpenAI(chats) {
    return __awaiter(this, void 0, void 0, function () {
        var config, openai, chatResponse, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = (0, openai_config_js_1.configureOpenAI)();
                    openai = new openai_1.OpenAIApi(config);
                    return [4 /*yield*/, openai.createChatCompletion({
                            model: constants_js_1.OPENAI.MODEL,
                            messages: chats,
                        })];
                case 1:
                    chatResponse = _a.sent();
                    message = chatResponse.data.choices[constants_js_1.INDEX.FIRST].message;
                    return [2 /*return*/, message];
            }
        });
    });
}
/**
 * Saves the user and sends an appropriate response.
 * @param {any} user - The user object to save.
 * @param {Response} res - The response object.
 * @param {any} message - The message to add to the user's chats.
 * @returns {Promise<Response>} The response object.
 */
function saveAndRespond(user, res, message) {
    return __awaiter(this, void 0, void 0, function () {
        var successResponse, error_1, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user.chats.push(message);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    successResponse = (0, user_handler_js_1.sendSuccessResponse)(res, { chats: user.chats });
                    return [2 /*return*/, successResponse];
                case 3:
                    error_1 = _a.sent();
                    errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error_1);
                    return [2 /*return*/, errorResponse];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Generates a chat completion and saves it to the user's chats.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object.
 */
function generateChatCompletion(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var message, user, chats, chatResponseMessage, successResponse, error_2, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    message = req.body.message;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, (0, user_handler_js_1.validateUserByID)(res.locals.jwtData.id)];
                case 2:
                    user = _a.sent();
                    (0, user_handler_js_1.verifyUserPermissions)(user, res.locals.jwtData.id);
                    chats = prepareChats(user, message);
                    return [4 /*yield*/, sendToOpenAI(chats)];
                case 3:
                    chatResponseMessage = _a.sent();
                    return [4 /*yield*/, saveAndRespond(user, res, chatResponseMessage)];
                case 4:
                    successResponse = _a.sent();
                    return [2 /*return*/, successResponse];
                case 5:
                    error_2 = _a.sent();
                    errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error_2);
                    return [2 /*return*/, errorResponse];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.generateChatCompletion = generateChatCompletion;
/**
 * Finds a user by ID.
 * @param {string} userId - The ID of the user to find.
 * @returns {Promise<any>} The user if found.
 * @throws {Error} If the user is not found.
 */
function findUser(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            user = (0, user_handler_js_1.validateUserByID)(userId);
            return [2 /*return*/, user];
        });
    });
}
/**
 * Sends the chats of the user to the client.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object.
 */
function sendChatsToUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, chats, error_3, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, findUser(res.locals.jwtData.id)];
                case 1:
                    user = _a.sent();
                    (0, user_handler_js_1.verifyUserPermissions)(user, res.locals.jwtData.id);
                    return [4 /*yield*/, getUserChats(res.locals.jwtData.id)];
                case 2:
                    chats = _a.sent();
                    return [2 /*return*/, (0, user_handler_js_1.sendSuccessResponse)(res, { chats: chats })];
                case 3:
                    error_3 = _a.sent();
                    errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error_3);
                    return [2 /*return*/, errorResponse];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.sendChatsToUser = sendChatsToUser;
/**
 * Deletes all chat messages of the user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object.
 */
function deleteChats(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, error_4, errorResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, findUser(res.locals.jwtData.id)];
                case 1:
                    user = _a.sent();
                    (0, user_handler_js_1.verifyUserPermissions)(user, res.locals.jwtData.id);
                    user.chats.splice(constants_js_1.INDEX.FIRST, user.chats.length);
                    return [4 /*yield*/, user.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, (0, user_handler_js_1.sendSuccessResponse)(res)];
                case 3:
                    error_4 = _a.sent();
                    errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error_4);
                    return [2 /*return*/, errorResponse];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteChats = deleteChats;
