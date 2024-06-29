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
 */
async function getUserChats(userId) {
    const user = await (0, user_handler_js_1.findUserByID)(userId);
    const chats = user.chats;
    return chats;
}
/**
 * Prepares the chat messages by adding a new user message.
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
 */
async function generateChatCompletion(req, res, next) {
    const { message } = req.body;
    try {
        const user = await (0, user_handler_js_1.findUserByID)(res.locals.jwtData.id);
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
 * Sends the chats of the user to the client.
 */
async function sendChatsToUser(req, res, next) {
    try {
        const user = await (0, user_handler_js_1.findUserByID)(res.locals.jwtData.id);
        (0, user_handler_js_1.verifyUserPermissions)(user, res.locals.jwtData.id);
        const chats = await getUserChats(res.locals.jwtData.id);
        const successResponse = (0, user_handler_js_1.sendSuccessResponse)(res, { chats: chats || [] });
        return successResponse;
    }
    catch (error) {
        const errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, error);
        return errorResponse;
    }
}
/**
 * Deletes all chat messages of the user.
 */
async function deleteChats(req, res, next) {
    try {
        const user = await (0, user_handler_js_1.findUserByID)(res.locals.jwtData.id);
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