import axios from 'axios';

export async function loginUser(email: string, password: string) {
  const res = await axios.post('/user/login', { email, password });

  if (!(res.status === 200 || res.status === 201)) {
    throw new Error('Unable to login! ' + res.status);
  }

  const data = await res.data;

  return data;
}
