import axios from 'axios';

export async function loginUser(email: string, password: string) {
  const res = await axios.post('/user/login', { email, password });

  if (!(res.status === 200 || res.status === 201)) {
    throw new Error('Unable to login! ' + res.status);
  }

  const data = await res.data;

  return data;
}

export async function checkAuthStatus() {
  const res = await axios.get('/user/auth-status');

  if (!(res.status === 200 || res.status === 201)) {
    throw new Error('Unable to authenticate! ' + res.status);
  }

  const data = await res.data;

  return data;
}

export async function sendChatRequest(message: string) {
  const res = await axios.post('/chat/new', { message });

  if (!(res.status === 200 || res.status === 201)) {
    throw new Error('Unable to send chat! ' + res.status);
  }

  const data = await res.data;

  return data;
}

export async function getUserChats() {
  const res = await axios.get('/chat/all-chats');

  if (!(res.status === 200 || res.status === 201)) {
    throw new Error('Unable to send chat! ' + res.status);
  }

  const data = await res.data;

  return data;
}

export async function deleteUserChats() {
  const res = await axios.delete('/chat/delete');

  if (res.status !== 200) {
    throw new Error('Unable to delete chats! ' + res.status);
  }

  const data = await res.data;

  return data;
}
