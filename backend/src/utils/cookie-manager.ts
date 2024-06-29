import { COOKIE, COOKIE_OPTIONS } from '../constants/constants.js';
import { createToken } from './token-manager.js';

/**
 * Clears a specific cookie from the client browser.
 */
export function deleteCookie(res) {
  res.clearCookie(COOKIE.NAME, COOKIE_OPTIONS);
}

/**
 * Manages user session cookies by refreshing or setting a new cookie.
 */
export function handleUserCookie(res, user) {
  deleteCookie(res);

  const token = createToken(user._id.toString(), user.email, COOKIE.EXPIRES_IN);

  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  res.cookie(COOKIE.NAME, token, { ...COOKIE_OPTIONS, expires });
}
