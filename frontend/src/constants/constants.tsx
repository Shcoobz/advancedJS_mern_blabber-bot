import { createTheme } from '@mui/material/styles';
import { Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Error404 from '../pages/Error404';
import Chat from '../pages/Chat';

/**
 * Defines the Material-UI theme for the application, specifying typography settings.
 */
export const THEME: object = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, sans-serif',
    allVariants: { color: 'whitesmoke' },
  },
});

/**
 * An object that contains route configurations for the application.
 * Each property represents a route with a specific path and component to render.
 */
export const ROUTE = {
  HOME: <Route path='/' element={<Home />} />,
  LOGIN: <Route path='/login' element={<Login />} />,
  SIGNUP: <Route path='/signup' element={<Signup />} />,
  CHAT: <Route path='/chat' element={<Chat />} />,
  ERROR: <Route path='*' element={<Error404 />} />,
};

/**
 * The key value used to detect the 'Enter' key press.
 */
export const SUBMIT_KEY = 'Enter';

/**
 * Constants used throughout the application for various text processing tasks.
 */
export const REGEX = {
  WHITESPACE: /\s+/,
  CODE_BLOCK_DELIMITER: /```/,
  CODE_BLOCK: /[=;\[\]{}#]|\/\/|<[^>]+>/,
  LIST_ITEM: /^(\d+\..+|[-*+]\s*.+)$/gm,
  NEWLINE: /\n/,
};

/**
 * String constants used throughout the application for consistent text representation.
 */
export const STRING = {
  NEWLINE: '\n',
  CODE_BLOCK_START: '```',
  CODE_BLOCK_END: '```',
  LIST_TYPE: 'list',
  ROOT: 'root',
};

/**
 * Index constants used for string and array manipulation.
 */
export const INDEX = {
  FIRST_CHAR: 0,
  START_REST: 1,
};

/**
 * Length constants used for array length comparisons.
 */
export const LENGTH = {
  SINGLE_PART: 1,
  LAST_PART: -1,
};

/**
 * General information constants used throughout the application.
 */
export const INFO = {
  TITLE: 'Chat with Blabber Bot!',
  DESCRIPTION: "You can ask questions related to anything you're interested in!",
  MODEL_VERSION: 'Model - GPT 3.5 Turbo',
  PLACEHOLDER: 'Type your message here...',
  TECH_DESC: 'MERN',
  HYPHEN: ' - ',
  PROJ_NAME: 'Blabber Bot',
  PLAINTEXT: 'plaintext',
};

/**
 * Typing animation sequence details.
 */
export const SEQUENCE_DETAILS = {
  SEQ_1: { message: `${INFO.PROJ_NAME} - AI at your fingertips`, delay: 1000 },
  SEQ_2: { message: `${INFO.PROJ_NAME} - Experience advanced AI chat`, delay: 2000 },
  SEQ_3: { message: `${INFO.PROJ_NAME} - Powered by Chat GPT 3.5`, delay: 1500 },
  SEQ_4: { message: `${INFO.PROJ_NAME} - Built by Shcoobz`, delay: 2000 },
};

/**
 * Base URLs for various API endpoints and routes
 */
const USER_BASE_URL = '/user';
const CHAT_BASE_URL = '/chat';

/**
 * URL constants for user and chat-related endpoints.
 */
export const URL = {
  USER: {
    SIGNUP: `${USER_BASE_URL}/signup`,
    LOGIN: `${USER_BASE_URL}/login`,
    LOGOUT: `${USER_BASE_URL}/logout`,
    AUTH_STATUS: `${USER_BASE_URL}/auth-status`,
    GET_USER_DATA: `${USER_BASE_URL}/get-user-data`,
  },

  CHAT: {
    NEW_MSG: `${CHAT_BASE_URL}/new`,
    ALL_CHATS: `${CHAT_BASE_URL}/all-chats`,
    DELETE_CHATS: `${CHAT_BASE_URL}/delete`,
  },

  API_BASE: 'http://localhost:5000/api/v1',
  RENDER: 'https://advancedjs-mern-blabber-bot.onrender.com/',
};

export const ENVIRONMENT = 'production';

export const baseURL = process.env.NODE_ENV === ENVIRONMENT ? URL.RENDER : URL.API_BASE;

/**
 * Error messages for various operations.
 */
export const ERROR = {
  USER: {
    SIGNUP: 'Unable to signup! ',
    LOGIN: 'Unable to login! ',
    LOGOUT: 'Unable to logout! ',
    AUTH_STATUS: 'Unable to authenticate! ',
    FETCH_DATA: 'Failed to fetch user data. ',
  },
  CHAT: {
    NEW: 'Unable to send new chat message! ',
    FETCH_ALL: 'Unable to retrieve all chats! ',
    DELETE: 'Unable to delete chats! ',
  },
  PAGE: {
    NOT_FOUND: '404 Error: Page Not Found',
  },
};

/**
 * Form field names used in the application.
 */
export const FORM_FIELD = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
};

/**
 * Navigation paths for routing within the application.
 */
export const NAVIGATION = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CHAT: '/chat',
};

/**
 * Button labels used throughout the application.
 */
export const BUTTON = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  CHAT: 'Chat',
  LOGOUT: 'Logout',
  DELETE: 'Delete chats',
};

/**
 * Toast messages for various operations, categorized by operation type.
 */
export const TOAST = {
  SIGNUP: {
    ID: 'signup',
    LOADING: 'Signing up!',
    SUCCESS: 'Signed up successfully!',
    ERROR: 'Sign up failed! :(',
  },

  LOGIN: {
    ID: 'login',
    LOADING: 'Logging in!',
    SUCCESS: 'Log in successfully!',
    ERROR: 'Log in failed! :(',
  },

  CHATS: {
    ID: 'loadchats',
    LOADING: 'Loading chats!',
    SUCCESS: 'Successfully loaded chats!',
    ERROR: 'Loading chats failed! :(',
  },

  DELETION: {
    ID: 'deletechats',
    LOADING: 'Deleting chats!',
    SUCCESS: 'Deleted chats successfully!',
    ERROR: 'Deleting chats failed! :(',
  },
};

/**
 * User roles within the application.
 */
export const ROLE = {
  ASSISTANT: 'assistant',
  USER: 'user',
};

/**
 * URL to the project portfolio on GitHub.
 */
export const GITHUB_URL = 'https://shcoobz.github.io/';

/**
 * Text for the footer credit.
 */
export const FOOTER_CREDIT_TEXT = 'Build by';

/**
 * Creator's name for the footer credit.
 */
export const CREATOR = 'Shcoobz';
