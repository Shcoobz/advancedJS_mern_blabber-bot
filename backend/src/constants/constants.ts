import { config } from 'dotenv';

config();

/**
 * Network and environment configurations.
 */
export const PORT = process.env.PORT || 3000;
export const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
export const EMPTY_STRING = '';
export const PASSWORD_MIN_LENGTH = 6;
export const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
export const ALLOWED_HEADERS = ['Content-Type', 'Authorization'];

/**
 * Error message constants structured by context and usage.
 */
export const ERROR = {
  USER: {
    NOT_REGISTERED: 'User not registered or token malfunction!',
    PERMISSIONS_MISMATCH: "Permissions didn't match!",
    ALREADY_REGISTERED: 'User already registered!',
    UNAUTHORIZED: 'Invalid email or password.',
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
    NO_TOKEN_RECEIVED: 'No token received, continuing as guest',
  },
  SERVING: {
    FAIL: 'Error serving ',
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
    START: `\nServer listening on PORT ${PORT} && connected to Database!\nVisit: ${BACKEND_BASE_URL}`,
  },
};

/**
 * Role constants to manage user permissions and roles within the application.
 */
export const ROLE = {
  USER: 'user' as 'user',
  ASSISTANT: 'assistant' as 'assistant',
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
  DOMAIN: process.env.COOKIE_DOMAIN,
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
export const FORM_FIELD = {
  EMAIL: 'email',
  PASSWORD: 'password',
  NAME: 'name',
  MSG: 'message',
};
