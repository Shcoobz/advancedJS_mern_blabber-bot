import { createTheme } from '@mui/material/styles';
import { Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Error404 from '../pages/Error404';
import Chat from '../pages/Chat';

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
 * An object that contains route configurations for the application.
 * Each property represents a route with a specific path and component to render.
 *
 * @constant
 * @type {object}
 * @property {JSX.Element} HOME - Route for the home page.
 * @property {JSX.Element} LOGIN - Route for the login page.
 * @property {JSX.Element} SIGNUP - Route for the signup page.
 * @property {JSX.Element} CHAT - Route for the chat page.
 * @property {JSX.Element} ERROR - Route for handling 404 errors.
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
 * This is used for submitting forms or triggering actions when the 'Enter' key is pressed.
 * @constant
 * @type {string}
 */
export const SUBMIT_KEY = 'Enter';

/**
 * Constants used throughout the application for various text processing tasks.
 * @constant
 * @type {object}
 * @property {RegExp} WHITESPACE - Matches one or more whitespace characters.
 * @property {RegExp} CODE_BLOCK_DELIMITER - Matches Markdown code block delimiters (``` syntax).
 * @property {RegExp} CODE_BLOCK - Matches common code block indicators such as =, ;, [, ], {, }, #, //, and <...>.
 * @property {RegExp} LIST_ITEM - Matches Markdown list items, including ordered and unordered lists.
 * @property {RegExp} NEWLINE - Matches newline characters.
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
 * @constant
 * @type {object}
 * @property {string} NEWLINE - Represents a newline character.
 * @property {string} CODE_BLOCK_START - Represents the start delimiter for a Markdown code block (``` syntax).
 * @property {string} CODE_BLOCK_END - Represents the end delimiter for a Markdown code block (``` syntax).
 * @property {string} LIST_TYPE - Represents the type for list items.
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
 * @constant
 * @type {object}
 * @property {number} FIRST_CHAR - Index of the first character.
 * @property {number} START_REST - Index to start the rest of the string.
 */
export const INDEX = {
  FIRST_CHAR: 0,
  START_REST: 1,
};

/**
 * Length constants used for array length comparisons.
 * @constant
 * @type {object}
 * @property {number} SINGLE_PART - Length indicating a single part.
 * @property {number} LAST_PART - Indicator for the last part in an array.
 */
export const LENGTH = {
  SINGLE_PART: 1,
  LAST_PART: -1,
};

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
  PAGE: {
    NOT_FOUND: '404 Error: Page Not Found',
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
