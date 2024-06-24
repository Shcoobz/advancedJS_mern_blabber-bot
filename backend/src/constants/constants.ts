export const MSG = {
  ERROR: {
    USER: {
      NOT_REGISTERED: 'User not registered or token malfunction!',
      PERMISSIONS_MISMATCH: "Permissions didn't match!",
    },
    GENERAL: {
      SOMETHING_WENT_WRONG: 'Something went terribly wrong!',
    },
  },
  SUCCESS: {
    OK: 'OK!',
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
