// This module defines and exports constants used throughout the application.
// These constants include configuration values, error messages, success messages,
// roles, and more, which are used to maintain consistency and manage configurations centrally.
/**
 * Network and environment configurations.
 */
export const PORT = process.env.PORT || 5000;
export const EMPTY_STRING = '';
export const PASSWORD_MIN_LENGTH = 6;
/**
 * Error message constants structured by context and usage.
 */
export const ERROR = {
    USER: {
        NOT_REGISTERED: 'User not registered or token malfunction!',
        PERMISSIONS_MISMATCH: "Permissions didn't match!",
        ALREADY_REGISTERED: 'User already registered!',
        INCORRECT_PASSWORD: 'Incorrect Password!',
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
};
/**
 * Success message constants structured by context.
 */
export const SUCCESS = {
    RES: {
        OK: 'OK!',
    },
    USER: {
        REGISTRATION: 'Successfully registered!',
        LOGIN: 'Successfully logged in!',
        LOGOUT: 'User verified!',
    },
    SERVER: {
        START: `\nServer listening on Port {{port}} && connected to Database!`,
    },
};
/**
 * Role constants to manage user permissions and roles within the application.
 */
export const ROLE = {
    USER: 'user',
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    FUNCTION: 'function',
};
/**
 * Constants related to OpenAI configurations.
 */
export const OPENAI = {
    MODEL: 'gpt-3.5-turbo',
};
/**
 * Utility constants for common indices and numerical values.
 */
export const INDEX = {
    FIRST: 0,
};
/**
 * Cookie configuration constants.
 */
export const COOKIE = {
    EXPIRES_IN: '7d',
    DOMAIN: 'localhost',
    NAME: 'auth_token',
    PATH: '/',
};
/**
 * Detailed options for cookie settings, utilized in middleware and cookie handling.
 */
export const COOKIE_OPTIONS = {
    path: COOKIE.PATH,
    domain: COOKIE.DOMAIN,
    httpOnly: true,
    signed: true,
};
/**
 * Security-related constants, such as Bcrypt salt rounds for password hashing.
 */
export const SECURITY = {
    BCRYPT_SALT_ROUNDS: 10,
};
/**
 * Route constants for defining API endpoints clearly and centrally.
 */
export const ROUTE = {
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
};
/**
 * Form field names used across the application, ensuring consistency in payload parsing.
 */
export const FORM_FIELD = {
    EMAIL: 'email',
    PASSWORD: 'password',
    NAME: 'name',
    MSG: 'message',
};
//# sourceMappingURL=constants.js.map