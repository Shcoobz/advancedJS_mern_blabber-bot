import { Router } from 'express';

import { ROUTE } from '../constants/constants.js';
import { verifyToken } from '../utils/token-manager.js';
import { validate, chatCompletionValidator } from '../utils/validators.js';
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from '../controllers/chat-controllers.js';

/**
 * Router for chat-related endpoints.
 * Utilizes middleware for validation and authentication, and controllers to handle the request logic.
 *
 * Routes:
 * - POST: `/new` - Creates a new chat completion. Requires validation and authentication.
 * - GET: `/all-chats` - Retrieves all chats for the authenticated user.
 * - DELETE: `/delete` - Deletes chats based on provided criteria, requires authentication.
 */
const chatRoutes = Router();

chatRoutes.post(
  ROUTE.CHAT.NEW,
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

export function logRequest(req, res, next) {
  console.log(`Request received at ${req.originalUrl} - Method: ${req.method}`);
  next();
}

chatRoutes.get(ROUTE.CHAT.ALL, logRequest, verifyToken, sendChatsToUser);

// chatRoutes.get(ROUTE.CHAT.ALL, verifyToken, sendChatsToUser);
chatRoutes.delete(ROUTE.CHAT.DELETE, verifyToken, deleteChats);

export default chatRoutes;
