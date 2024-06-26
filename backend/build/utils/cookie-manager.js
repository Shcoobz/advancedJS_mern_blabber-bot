import { COOKIE, COOKIE_OPTIONS } from '../constants/constants.js';
import { createToken } from './token-manager.js';
/**
 * Clears a specific cookie from the client browser.
 *
 * @param {Response} res - The Express response object used to send the clear cookie command to the client.
 */
export function deleteCookie(res) {
    res.clearCookie(COOKIE.NAME, COOKIE_OPTIONS);
}
/**
 * Manages user session cookies by refreshing or setting a new cookie.
 *
 * @param {Response} res - The Express response object used to manage cookies in the client's browser.
 * @param {any} user - The user object from which the user ID and email are extracted for token creation.
 */
export function handleUserCookie(res, user) {
    deleteCookie(res);
    const token = createToken(user._id.toString(), user.email, COOKIE.EXPIRES_IN);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE.NAME, token, { ...COOKIE_OPTIONS, expires });
}
//# sourceMappingURL=cookie-manager.js.map