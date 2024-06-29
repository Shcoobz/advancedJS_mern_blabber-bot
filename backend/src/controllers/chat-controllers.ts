import { Request, Response, NextFunction } from 'express';
import { OpenAIApi, ChatCompletionRequestMessage } from 'openai';

import { configureOpenAI } from '../config/openai-config.js';
import { INDEX, OPENAI, ROLE } from '../constants/constants.js';

import {
  sendErrorResponse,
  sendSuccessResponse,
  validateUserByID,
  verifyUserPermissions,
} from './user-handler.js';

/**
 * Gets the chats of a user.
 */
async function getUserChats(userId: string) {
  const user = await validateUserByID(userId);
  const chats = user.chats;

  return chats;
}

/**
 * Prepares the chat messages by adding a new user message.
 */
function prepareChats(user: any, message: string) {
  const chats = user.chats.map(({ role, content }) => ({
    role,
    content,
  })) as ChatCompletionRequestMessage[];

  chats.push({ content: message, role: ROLE.USER });
  user.chats.push({ content: message, role: ROLE.USER });

  return chats;
}

/**
 * Sends chat messages to OpenAI and gets the response.
 */
async function sendToOpenAI(chats: ChatCompletionRequestMessage[]) {
  const config = configureOpenAI();
  const openai = new OpenAIApi(config);
  const chatResponse = await openai.createChatCompletion({
    model: OPENAI.MODEL,
    messages: chats,
  });
  const message = chatResponse.data.choices[INDEX.FIRST].message;

  return message;
}

/**
 * Saves the user and sends an appropriate response.
 */
async function saveAndRespond(user: any, res: Response, message: any) {
  user.chats.push(message);

  try {
    await user.save();

    const successResponse = sendSuccessResponse(res, { chats: user.chats });

    return successResponse;
  } catch (error) {
    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}

/**
 * Generates a chat completion and saves it to the user's chats.
 */
export async function generateChatCompletion(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { message } = req.body;

  try {
    const user = await validateUserByID(res.locals.jwtData.id);
    verifyUserPermissions(user, res.locals.jwtData.id);

    const chats = prepareChats(user, message);
    const chatResponseMessage = await sendToOpenAI(chats);

    const successResponse = await saveAndRespond(user, res, chatResponseMessage);

    return successResponse;
  } catch (error) {
    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}

/**
 * Finds a user by ID.
 */
async function findUser(userId: string) {
  const user = validateUserByID(userId);

  return user;
}

/**
 * Sends the chats of the user to the client.
 */
export async function sendChatsToUser(req: Request, res: Response, next: NextFunction) {
  console.log('Sending chats to user...');
  try {
    const userId = res.locals.jwtData.id;
    console.log('User ID from token:', userId);

    const user = await findUser(res.locals.jwtData.id);
    verifyUserPermissions(user, res.locals.jwtData.id);
    console.log('User permissions verified for user:', user);

    const chats = await getUserChats(res.locals.jwtData.id);
    console.log('Chats retrieved for user:', chats);

    // return sendSuccessResponse(res, { chats });
    return sendSuccessResponse(res, { chats: chats || [] });
  } catch (error) {
    console.error('Error in sendChatsToUser:', error);
    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}

/**
 * Deletes all chat messages of the user.
 */
export async function deleteChats(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await findUser(res.locals.jwtData.id);
    verifyUserPermissions(user, res.locals.jwtData.id);

    user.chats.splice(INDEX.FIRST, user.chats.length);
    await user.save();

    return sendSuccessResponse(res);
  } catch (error) {
    const errorResponse = sendErrorResponse(res, error);

    return errorResponse;
  }
}
