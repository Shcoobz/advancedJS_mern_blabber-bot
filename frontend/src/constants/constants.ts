import { createTheme } from '@mui/material/styles';

// Theme
export const THEME = createTheme({
  typography: {
    fontFamily: 'Roboto Slab, sans-serif',
    allVariants: { color: 'whitesmoke' },
  },
});

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

// Nav Bar

// Typing Animation
export const SEQUENCE_DETAILS = {
  SEQ_1: { message: `${INFO.PROJ_NAME} - AI at your fingertips`, delay: 1000 },
  SEQ_2: { message: `${INFO.PROJ_NAME} - Experience advanced AI chat`, delay: 2000 },
  SEQ_3: { message: `${INFO.PROJ_NAME} - Powered by Chat GPT 3.5`, delay: 1500 },
  SEQ_4: { message: `${INFO.PROJ_NAME} - Built by Shcoobz`, delay: 2000 },
};

// URLs
const USER_BASE_URL = '/user';
const CHAT_BASE_URL = '/chat';

export const URL = {
  USER: {
    SIGNUP: `${USER_BASE_URL}/signup`,
    LOGIN: `${USER_BASE_URL}/login`,
    LOGOUT: `${USER_BASE_URL}/logout`,
    AUTH_STATUS: `${USER_BASE_URL}/auth-status`,
  },

  CHAT: {
    NEW_MSG: `${CHAT_BASE_URL}/new`,
    ALL_CHATS: `${CHAT_BASE_URL}/all-chats`,
    DELETE_CHATS: `${CHAT_BASE_URL}/delete`,
  },
};

// Form Fields
export const FORM_FIELD = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
};

// Error Msg
export const ERROR = {
  USER: {
    SIGNUP: 'Unable to signup!',
    LOGIN: 'Unable to login!',
    LOGOUT: 'Unable to logout!',
    AUTH_STATUS: 'Unable to authenticate!',
  },
  CHAT: {
    NEW: 'Unable to send new chat message!',
    FETCH_ALL: 'Unable to retrieve all chats!',
    DELETE: 'Unable to delete chats!',
  },
};

// Navigation
export const NAVIGATION = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CHAT: '/chat',
};

// Buttons
export const BUTTON = {
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  CHAT: 'Chat',
  LOGOUT: 'Logout',
  DELETE: 'Delete chats',
};

// Toast Msg
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

// Roles
export const ROLE = {
  ASSISTANT: 'assistant',
  USER: 'user',
};

// Project Portfolio
export const GITHUB_URL = 'https://shcoobz.github.io/';

// Footer
export const FOOTER_CREDIT_TEXT = 'Build by';
export const CREATOR = 'Shcoobz';
