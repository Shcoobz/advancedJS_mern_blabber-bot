export const ERROR = {
    USER: {
        NOT_REGISTERED: 'User not registered or token malfunction!',
        PERMISSIONS_MISMATCH: "Permissions didn't match!",
    },
    RES: {
        FAIL: 'Something went terribly wrong!',
    },
};
export const SUCCESS = {
    RES: { OK: 'OK!' },
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
//# sourceMappingURL=constants.js.map