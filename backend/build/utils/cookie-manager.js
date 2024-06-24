import { COOKIE, COOKIE_OPTIONS } from '../constants/constants.js';
import { createToken } from './token-manager.js';
export function deleteCookie(res) {
    res.clearCookie(COOKIE.NAME, COOKIE_OPTIONS);
}
export function handleUserCookie(res, user) {
    deleteCookie(res);
    const token = createToken(user._id.toString(), user.email, COOKIE.EXPIRES_IN);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE.NAME, token, { ...COOKIE_OPTIONS, expires });
}
//# sourceMappingURL=cookie-manager.js.map