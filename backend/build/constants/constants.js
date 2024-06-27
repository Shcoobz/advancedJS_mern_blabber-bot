export const PORT = process.env.PORT || 5000;
export const EMPTY_STRING = '';
export const PASSWORD_MIN_LENGTH = 6;
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
export const ROLE = {
    USER: 'user',
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    FUNCTION: 'function',
};
export const OPENAI = {
    MODEL: 'gpt-3.5-turbo',
};
export const INDEX = {
    FIRST: 0,
};
export const COOKIE = {
    EXPIRES_IN: '7d',
    DOMAIN: 'localhost',
    NAME: 'auth_token',
    PATH: '/',
};
export const COOKIE_OPTIONS = {
    path: COOKIE.PATH,
    domain: COOKIE.DOMAIN,
    httpOnly: true,
    signed: true,
};
export const SECURITY = {
    BCRYPT_SALT_ROUNDS: 10,
};
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
export const FORM_FIELD = {
    EMAIL: 'email',
    PASSWORD: 'password',
    NAME: 'name',
    MSG: 'message',
};
//# sourceMappingURL=constants.js.map