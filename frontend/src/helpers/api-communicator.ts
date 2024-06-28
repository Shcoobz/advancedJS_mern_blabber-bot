import axios, { AxiosError, AxiosInstance } from 'axios';
import { URL, ERROR, baseURL } from '../constants/constants';

const axiosInstance = axios.create({
  baseURL,
});

const silentAxios = createSilentAxios();

/**
 * Fetches user data from the server.
 * @returns {Promise<any>} The user data retrieved from the server.
 * @throws {Error} If the response status is not 200.
 */
export async function fetchUserData() {
  try {
    const res = await axiosInstance.get(URL.USER.GET_USER_DATA);

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
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<any>} The data returned from the signup request.
 * @throws {Error} If the response status is not 201 or if there is an error during the request.
 */
export async function signupUser(name: string, email: string, password: string) {
  try {
    const res = await axiosInstance.post(URL.USER.SIGNUP, { name, email, password });

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
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<any>} The data returned from the login request.
 * @throws {Error} If the response status is not 200 or if there is an error during the request.
 */
export async function loginUser(email: string, password: string) {
  try {
    const res = await axiosInstance.post(URL.USER.LOGIN, { email, password });

    if (res.status !== 200) {
      throw new Error(ERROR.USER.LOGIN + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.USER.LOGIN, error);
  }
}

/**
 * Logs out the current user.
 * @returns {Promise<any>} The data returned from the logout request.
 * @throws {Error} If the response status is not 200 or if there is an error during the request.
 */
export async function logoutUser() {
  try {
    const res = await axiosInstance.get(URL.USER.LOGOUT);

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
 * @returns {AxiosInstance} The configured Axios instance.
 */
function createSilentAxios(): AxiosInstance {
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
 * @returns {Promise<boolean>} True if the user is authenticated, false otherwise.
 */
export async function checkAuthStatus() {
  try {
    const res = await silentAxios.get(URL.USER.AUTH_STATUS, {
      withCredentials: true,
    });

    return res.data.isAuthenticated ?? false;
  } catch (error) {
    return false;
  }
}

/**
 * Sends a chat message to the server.
 * @param {string} message - The chat message to be sent.
 * @returns {Promise<any>} The data returned from the chat request.
 * @throws {Error} If the response status is not 200 or if there is an error during the request.
 */
export async function sendChatRequest(message: string) {
  try {
    const res = await axiosInstance.post(URL.CHAT.NEW_MSG, { message });

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
 * @returns {Promise<any>} The data returned from the get all chats request.
 * @throws {Error} If the response status is not 200 or if there is an error during the request.
 */
export async function getUserChats() {
  try {
    const res = await axiosInstance.get(URL.CHAT.ALL_CHATS);

    if (res.status !== 200) {
      throw new Error(ERROR.CHAT.FETCH_ALL + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.CHAT.FETCH_ALL, error);
  }
}

/**
 * Deletes all chat messages for the user.
 * @returns {Promise<any>} The data returned from the delete chats request.
 * @throws {Error} If the response status is not 200 or if there is an error during the request.
 */
export async function deleteUserChats() {
  try {
    const res = await axiosInstance.delete(URL.CHAT.DELETE_CHATS);

    if (res.status !== 200) {
      throw new Error(ERROR.CHAT.DELETE + res.status);
    }

    const data = await res.data;

    return data;
  } catch (error) {
    console.error(ERROR.CHAT.DELETE, error);
  }
}
