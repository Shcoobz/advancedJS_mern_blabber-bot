"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChatCompletion = generateChatCompletion;
exports.sendChatsToUser = sendChatsToUser;
exports.deleteChats = deleteChats;
const openai_1 = require("openai");
const openai_config_js_1 = require("../config/openai-config.js");
const constants_js_1 = require("../constants/constants.js");
const user_handler_js_1 = require("./user-handler.js");
/**
 * Gets the chats of a user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<any[]>} The chats of the user.
 */
async function getUserChats(userId) {
    const user = await (0, user_handler_js_1.validateUserByID)(userId);
    const chats = user.chats;
    return chats;
}
/**
 * Prepares the chat messages by adding a new user message.
 * @param {any} user - The user object.
 * @param {string} message - The new message content.
 * @returns {ChatCompletionRequestMessage[]} The prepared chat messages.
 */
function prepareChats(user, message) {
    const chats = user.chats.map(({ role, content }) => ({
        role,
        content,
    }));
    chats.push({ content: message, role: constants_js_1.ROLE.USER });
    user.chats.push({ content: message, role: constants_js_1.ROLE.USER });
    return chats;
}
/**
 * Sends chat messages to OpenAI and gets the response.
 * @param {ChatCompletionRequestMessage[]} chats - The chat messages.
 * @returns {Promise<string>} The response message from OpenAI.
 */
async function sendToOpenAI(chats) {
    const config = (0, openai_config_js_1.configureOpenAI)();
    const openai = new openai_1.OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
        model: constants_js_1.OPENAI.MODEL,
        messages: chats,
    });
    const message = chatResponse.data.choices[constants_js_1.INDEX.FIRST].message;
    return message;
}
/**
 * Saves the user and sends an appropriate response.
 * @param {any} user - The user object to save.
 * @param {Response} res - The response object.
 * @param {any} message - The message to add to the user's chats.
 * @returns {Promise<Response>} The response object.
 */
async function saveAndRespond(user, res, message) {
    user.chats.push(message);
    try {
        await user.save();
        const successResponse = (0, user_handler_js_1.sendSuccessResponse)(res, { chats: user.chats });
        return successResponse;
    }
    catch (error) {
        const errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error);
        return errorResponse;
    }
}
/**
 * Generates a chat completion and saves it to the user's chats.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object.
 */
async function generateChatCompletion(req, res, next) {
    const { message } = req.body;
    try {
        const user = await (0, user_handler_js_1.validateUserByID)(res.locals.jwtData.id);
        (0, user_handler_js_1.verifyUserPermissions)(user, res.locals.jwtData.id);
        const chats = prepareChats(user, message);
        const chatResponseMessage = await sendToOpenAI(chats);
        const successResponse = await saveAndRespond(user, res, chatResponseMessage);
        return successResponse;
    }
    catch (error) {
        const errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error);
        return errorResponse;
    }
}
/**
 * Finds a user by ID.
 * @param {string} userId - The ID of the user to find.
 * @returns {Promise<any>} The user if found.
 * @throws {Error} If the user is not found.
 */
async function findUser(userId) {
    const user = (0, user_handler_js_1.validateUserByID)(userId);
    return user;
}
/**
 * Sends the chats of the user to the client.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object.
 */
async function sendChatsToUser(req, res, next) {
    try {
        const user = await findUser(res.locals.jwtData.id);
        (0, user_handler_js_1.verifyUserPermissions)(user, res.locals.jwtData.id);
        const chats = await getUserChats(res.locals.jwtData.id);
        return (0, user_handler_js_1.sendSuccessResponse)(res, { chats });
    }
    catch (error) {
        const errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error);
        return errorResponse;
    }
}
/**
 * Deletes all chat messages of the user.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<Response>} The response object.
 */
async function deleteChats(req, res, next) {
    try {
        const user = await findUser(res.locals.jwtData.id);
        (0, user_handler_js_1.verifyUserPermissions)(user, res.locals.jwtData.id);
        user.chats.splice(constants_js_1.INDEX.FIRST, user.chats.length);
        await user.save();
        return (0, user_handler_js_1.sendSuccessResponse)(res);
    }
    catch (error) {
        const errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error);
        return errorResponse;
    }
}
//# sourceMappingURL=chat-controllers.js.map