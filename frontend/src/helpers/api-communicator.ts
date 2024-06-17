import axios from 'axios';
import { URL, ERROR } from '../constants/constants';

export async function signupUser(name: string, email: string, password: string) {
  const res = await axios.post(URL.USER.SIGNUP, { name, email, password });

  if (res.status !== 201) {
    throw new Error(ERROR.USER.SIGNUP + res.status);
  }

  const data = await res.data;

  return data;
}

export async function loginUser(email: string, password: string) {
  const res = await axios.post(URL.USER.LOGIN, { email, password });

  if (res.status !== 200) {
    throw new Error(ERROR.USER.LOGIN + res.status);
  }

  const data = await res.data;

  return data;
}

export async function logoutUser() {
  const res = await axios.get(URL.USER.LOGOUT);

  if (res.status !== 200) {
    throw new Error(ERROR.USER.LOGOUT + res.status);
  }

  const data = await res.data;

  return data;
}

export async function checkAuthStatus() {
  const res = await axios.get(URL.USER.AUTH_STATUS);

  if (res.status !== 200) {
    throw new Error(ERROR.USER.AUTH_STATUS + res.status);
  }

  const data = await res.data;

  return data;
}

export async function sendChatRequest(message: string) {
  const res = await axios.post(URL.CHAT.NEW_MSG, { message });

  if (res.status !== 200) {
    throw new Error(ERROR.CHAT.NEW + res.status);
  }

  const data = await res.data;

  return data;
}

export async function getUserChats() {
  const res = await axios.get(URL.CHAT.ALL_CHATS);

  if (res.status !== 200) {
    throw new Error(ERROR.CHAT.FETCH_ALL + res.status);
  }

  const data = await res.data;

  return data;
}

export async function deleteUserChats() {
  const res = await axios.delete(URL.CHAT.DELETE_CHATS);

  if (res.status !== 200) {
    throw new Error(ERROR.CHAT.DELETE + res.status);
  }

  const data = await res.data;

  return data;
}
