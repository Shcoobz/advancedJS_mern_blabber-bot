"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FORM_FIELD = exports.ROUTE = exports.SECURITY = exports.COOKIE_OPTIONS = exports.COOKIE = exports.INDEX = exports.OPENAI = exports.ROLE = exports.SUCCESS = exports.ERROR = exports.ALLOWED_HEADERS = exports.HTTP_METHODS = exports.PASSWORD_MIN_LENGTH = exports.EMPTY_STRING = exports.BACKEND_BASE_URL = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/**
 * Network and environment configurations.
 */
exports.PORT = process.env.PORT || 3000;
exports.BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
exports.EMPTY_STRING = '';
exports.PASSWORD_MIN_LENGTH = 6;
exports.HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
exports.ALLOWED_HEADERS = ['Content-Type', 'Authorization'];
/**
 * Error message constants structured by context and usage.
 */
exports.ERROR = {
    USER: {
        NOT_REGISTERED: 'User not registered or token malfunction!',
        PERMISSIONS_MISMATCH: "Permissions didn't match!",
        ALREADY_REGISTERED: 'User already registered!',
        INCORRECT_PASSWORD: 'Email and Password do not match!',
    },
    RES: {
        FAIL: 'Something went terribly wrong!',
    },
    DB: {
        CONNECTION_FAILED: 'Connection to MongoDB failed!',
        DISCONNECTED: 'Disconnected from MongoDB!',
    },
    TOKEN: {
        NOT_RECEIVED: 'Token not received!',
        EXPIRED: 'Token expired!',
        VERIFICATION_FAILED: 'Token verification failed:',
    },
    VALIDATION: {
        EMAIL: 'E-mail is required!',
        PASSWORD: 'Password should contain at least 6 characters!',
        NAME: 'Name is required!',
        MSG: 'Message is required!',
        FAILED: 'Validation failed',
        ERROR_NAME: 'ValidationError',
    },
    SERVER: {
        FAILED_CONNECTION: 'Failed to connect to the database:',
    },
    SERVING: {
        FAIL: 'Error serving ',
    },
};
/**
 * Success message constants structured by context.
 */
exports.SUCCESS = {
    RES: {
        OK: 'OK!',
    },
    USER: {
        REGISTRATION: 'Successfully registered!',
        LOGIN: 'Successfully logged in!',
        LOGOUT: 'User verified!',
    },
    SERVER: {
        START: `\nServer listening on PORT ${exports.PORT} && connected to Database!\nVisit: ${exports.BACKEND_BASE_URL}`,
    },
};
/**
 * Role constants to manage user permissions and roles within the application.
 */
exports.ROLE = {
    USER: 'user',
    ASSISTANT: 'assistant',
};
/**
 * Constants related to OpenAI configurations.
 */
exports.OPENAI = {
    MODEL: 'gpt-3.5-turbo',
};
/**
 * Utility constants for common indices and numerical values.
 */
exports.INDEX = {
    FIRST: 0,
};
/**
 * Cookie configuration constants.
 */
exports.COOKIE = {
    EXPIRES_IN: '7d',
    DOMAIN: process.env.COOKIE_DOMAIN,
    NAME: 'auth_token',
    PATH: '/',
};
/**
 * Detailed options for cookie settings, utilized in middleware and cookie handling.
 */
exports.COOKIE_OPTIONS = {
    path: exports.COOKIE.PATH,
    domain: exports.COOKIE.DOMAIN,
    httpOnly: true,
    signed: true,
};
/**
 * Security-related constants, such as Bcrypt salt rounds for password hashing.
 */
exports.SECURITY = {
    BCRYPT_SALT_ROUNDS: 10,
};
/**
 * Route constants for defining API endpoints clearly and centrally.
 */
exports.ROUTE = {
    API: {
        VERSION: '/api/v1',
    },
    CHAT: {
        NEW: '/new',
        ALL: '/all-chats',
        DELETE: '/delete',
    },
    USER: {
        HOME: '/',
        AUTH: '/auth-status',
        DATA: '/get-user-data',
        LOGOUT: '/logout',
        SIGNUP: '/signup',
        LOGIN: '/login',
    },
    GLOBAL: {
        WILDCARD: '*',
    },
};
/**
 * Form field names used across the application, ensuring consistency in payload parsing.
 */
exports.FORM_FIELD = {
    EMAIL: 'email',
    PASSWORD: 'password',
    NAME: 'name',
    MSG: 'message',
};
//# sourceMappingURL=constants.js.map