import axios, { AxiosError } from 'axios';

import { URL, ERROR } from '../constants/constants';

/**
 * Default Axios instance with the baseURL and withCredentials already set in main.tsx
 */
const apiClient = axios.create();

/**
 * Function to create a silent Axios instance
 */
const silentAxios = createSilentAxios();

/**
 * Fetches user data from the server.
 */
export async function fetchUserData() {
  try {
    const res = await apiClient.get(URL.USER.GET_USER_DATA);

    if (res.status !== 200) {
      throw new Error(ERROR.USER.FETCH_DATA + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.USER.FETCH_DATA, error);
  }
}

/**
 * Signs up a new user with the provided name, email, and password.
 */
export async function signupUser(name: string, email: string, password: string) {
  try {
    const res = await apiClient.post(URL.USER.SIGNUP, { name, email, password });

    if (res.status !== 201) {
      throw new Error(ERROR.USER.SIGNUP + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.USER.SIGNUP, error);
  }
}

/**
 * Logs in a user with the provided email and password.
 */
export async function loginUser(email: string, password: string) {
  try {
    const res = await apiClient.post(URL.USER.LOGIN, { email, password });

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(ERROR.USER.LOGIN);
      } else if (error.request) {
        throw new Error(ERROR.SERVER.NO_RESPONSE);
      } else {
        throw new Error(ERROR.USER.LOGIN);
      }
    } else {
      throw new Error(ERROR.USER.LOGIN);
    }
  }
}

/**
 * Logs out the current user.
 */
export async function logoutUser() {
  try {
    const res = await apiClient.get(URL.USER.LOGOUT);

    if (res.status !== 200) {
      throw new Error(ERROR.USER.LOGOUT + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.USER.LOGOUT, error);
  }
}

/**
 * Creates an Axios instance with silent request and response handling.
 */
function createSilentAxios() {
  const instance = axios.create();
  const isStatusValid = (status: number) => status >= 200 && status < 600;

  instance.interceptors.request.use((config) => {
    config.validateStatus = isStatusValid;
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        return Promise.resolve(error.response);
      }
      return Promise.resolve({ data: { isAuthenticated: false } });
    }
  );

  return instance;
}

/**
 * Checks the authentication status of the user.
 */
export async function checkAuthStatus() {
  try {
    const res = await silentAxios.get(URL.USER.AUTH_STATUS, {
      withCredentials: true,
    });

    return res.data.isAuthenticated ?? false;
  } catch (error) {
    console.error(ERROR.USER.AUTH_STATUS, error);
    return false;
  }
}

/**
 * Sends a chat message to the server.
 */
export async function sendChatRequest(message: string) {
  try {
    const res = await apiClient.post(URL.CHAT.NEW_MSG, { message });

    if (res.status !== 200) {
      throw new Error(ERROR.CHAT.NEW + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.CHAT.NEW, error);
  }
}

/**
 * Retrieves all chat messages for the user.
 */
export async function getUserChats() {
  try {
    const res = await apiClient.get(URL.CHAT.ALL_CHATS);

    if (res.status !== 200) {
      throw new Error(ERROR.CHAT.FETCH_ALL + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.CHAT.FETCH_ALL, error);
    throw error;
  }
}

/**
 * Deletes all chat messages for the user.
 */
export async function deleteUserChats() {
  try {
    const res = await apiClient.delete(URL.CHAT.DELETE_CHATS);

    if (res.status !== 200) {
      throw new Error(ERROR.CHAT.DELETE + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.CHAT.DELETE, error);
  }
}
