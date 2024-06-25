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
};

export const ROLE = {
  USER: 'user' as 'user',
  ASSISTANT: 'assistant' as 'assistant',
  SYSTEM: 'system' as 'system',
  FUNCTION: 'function' as 'function',
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
