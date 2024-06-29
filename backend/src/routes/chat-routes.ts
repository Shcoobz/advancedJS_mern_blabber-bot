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
 */
const chatRoutes = Router();

chatRoutes.post(
  ROUTE.CHAT.NEW,
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get(ROUTE.CHAT.ALL, verifyToken, sendChatsToUser);
chatRoutes.delete(ROUTE.CHAT.DELETE, verifyToken, deleteChats);

export default chatRoutes;
