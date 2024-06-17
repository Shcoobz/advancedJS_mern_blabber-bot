// Nav Bar
export const TECH_DESC = 'MERN';
export const HYPHEN = ' - ';
export const PROJ_NAME = 'Blabber Bot';

// Typing Animation
export const SEQUENCE_1 = `${PROJ_NAME} - AI at your fingertips`;
export const SEQUENCE_2 = `${PROJ_NAME} - Experience advanced AI chat`;
export const SEQUENCE_3 = `${PROJ_NAME} - Powered by Chat GPT 3.5`;
export const SEQUENCE_4 = `${PROJ_NAME} - Built by Shcoobz`;

export const DELAY_1 = 1000;
export const DELAY_2 = 2000;
export const DELAY_3 = 1500;
export const DELAY_4 = 2000;

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

// Roles
export const ASSISTANT_ROLE = 'assistant';
export const USER_ROLE = 'user';

// Project Portfolio
export const GITHUB_URL = 'https://shcoobz.github.io/';

// Footer
export const FOOTER_CREDIT_TEXT = 'Build by';
export const CREATOR = 'Shcoobz';
