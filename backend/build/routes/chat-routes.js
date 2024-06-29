"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_js_1 = require("../constants/constants.js");
const token_manager_js_1 = require("../utils/token-manager.js");
const validators_js_1 = require("../utils/validators.js");
const chat_controllers_js_1 = require("../controllers/chat-controllers.js");
/**
 * Router for chat-related endpoints.
 * Utilizes middleware for validation and authentication, and controllers to handle the request logic.
 *
 * Routes:
 * - POST: `/new` - Creates a new chat completion. Requires validation and authentication.
 * - GET: `/all-chats` - Retrieves all chats for the authenticated user.
 * - DELETE: `/delete` - Deletes chats based on provided criteria, requires authentication.
 */
const chatRoutes = (0, express_1.Router)();
chatRoutes.post(constants_js_1.ROUTE.CHAT.NEW, (0, validators_js_1.validate)(validators_js_1.chatCompletionValidator), token_manager_js_1.verifyToken, chat_controllers_js_1.generateChatCompletion);
chatRoutes.get(constants_js_1.ROUTE.CHAT.ALL, token_manager_js_1.verifyToken, chat_controllers_js_1.sendChatsToUser);
chatRoutes.delete(constants_js_1.ROUTE.CHAT.DELETE, token_manager_js_1.verifyToken, chat_controllers_js_1.deleteChats);
exports.default = chatRoutes;
//# sourceMappingURL=chat-routes.js.map