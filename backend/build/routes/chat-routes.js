import { Router } from 'express';
import { ROUTE } from '../constants/constants.js';
import { verifyToken } from '../utils/token-manager.js';
import { validate, chatCompletionValidator } from '../utils/validators.js';
import { deleteChats, generateChatCompletion, sendChatsToUser, } from '../controllers/chat-controllers.js';
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
// Route to generate a new chat completion. This route validates the request data using `chatCompletionValidator` before proceeding to token verification and chat generation.
chatRoutes.post(ROUTE.CHAT.NEW, validate(chatCompletionValidator), verifyToken, generateChatCompletion);
// Route to get all chats for a user. It requires the user to be authenticated.
chatRoutes.get(ROUTE.CHAT.ALL, verifyToken, sendChatsToUser);
// Route to delete chats. This requires the user to be authenticated and only allows deletion of chats associated with the authenticated user.
chatRoutes.delete(ROUTE.CHAT.DELETE, verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map