"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = require("crypto");
/**
 * Chat Schema for MongoDB.
 * Defines the schema for a chat message within the user document.
 */
const chatSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: (0, crypto_1.randomUUID)(),
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
const userSchema = new mongoose_1.default.Schema({
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
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map