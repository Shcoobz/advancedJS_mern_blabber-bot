import { createTheme } from '@mui/material/styles';

/**
 * Defines the Material-UI theme for the application, specifying typography settings.
 * @constant
 * @type {object}
 */
export const THEME: object = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, sans-serif',
    allVariants: { color: 'whitesmoke' },
  },
});

/**
 * The key value used to detect the 'Enter' key press.
 * This is used for submitting forms or triggering actions when the 'Enter' key is pressed.
 * @constant
 * @type {string}
 */
export const SUBMIT_KEY = 'Enter';

/**
 * General information constants used throughout the application.
 * @constant
 * @type {object}
 * @property {string} TITLE - The title of the application.
 * @property {string} DESCRIPTION - The description of the application.
 * @property {string} MODEL_VERSION - The version of the AI model being used.
 * @property {string} PLACEHOLDER - Placeholder text for input fields.
 * @property {string} TECH_DESC - Short description of the technology stack.
 * @property {string} HYPHEN - A hyphen for concatenation.
 * @property {string} PROJ_NAME - The name of the project.
 * @property {string} PLAINTEXT - Default text type.
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
 * @constant
 * @type {object}
 * @property {object} SEQ_1 - The first sequence with message and delay.
 * @property {object} SEQ_2 - The second sequence with message and delay.
 * @property {object} SEQ_3 - The third sequence with message and delay.
 * @property {object} SEQ_4 - The fourth sequence with message and delay.
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
 * @constant
 * @type {object}
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
};

/**
 * Error messages for various operations.
 * @constant
 * @type {object}
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
};

/**
 * Form field names used in the application.
 * @constant
 * @type {object}
 */
export const FORM_FIELD = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
};

/**
 * Navigation paths for routing within the application.
 * @constant
 * @type {object}
 */
export const NAVIGATION = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CHAT: '/chat',
};

/**
 * Button labels used throughout the application.
 * @constant
 * @type {object}
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
 * @constant
 * @type {object}
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
 * @constant
 * @type {object}
 */
export const ROLE = {
  ASSISTANT: 'assistant',
  USER: 'user',
};

/**
 * URL to the project portfolio on GitHub.
 * @constant
 * @type {string}
 */
export const GITHUB_URL = 'https://shcoobz.github.io/';

/**
 * Text for the footer credit.
 * @constant
 * @type {string}
 */
export const FOOTER_CREDIT_TEXT = 'Build by';

/**
 * Creator's name for the footer credit.
 * @constant
 * @type {string}
 */
export const CREATOR = 'Shcoobz';
