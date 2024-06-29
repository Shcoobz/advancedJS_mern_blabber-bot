import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

/**
 * Chat Schema for MongoDB.
 * Defines the schema for a chat message within the user document.
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
