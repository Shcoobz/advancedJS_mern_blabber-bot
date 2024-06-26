import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

/**
 * Chat Schema for MongoDB.
 * Defines the schema for a chat message within the user document.
 *
 * Properties:
 * - id: Unique identifier for the chat message, defaults to a UUID.
 * - role: Describes the role of the chat participant (e.g., 'user', 'admin').
 * - content: The text content of the chat message.
 */
const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

/**
 * User Schema for MongoDB.
 * Defines the schema for user data stored in MongoDB.
 *
 * Properties:
 * - name: The name of the user, a required string.
 * - email: The user's email address, required and must be unique.
 * - password: The user's password, a required string.
 * - chats: An array of chat messages, defined by the chatSchema.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatSchema],
});

export default mongoose.model('User', userSchema);
