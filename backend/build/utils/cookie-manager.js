import { COOKIE_NAME, COOKIE_OPTIONS, EXPIRES_IN } from './constants.js';
import { createToken } from './token-manager.js';
export function handleUserCookie(res, user) {
    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
    const token = createToken(user._id.toString(), user.email, EXPIRES_IN);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, { ...COOKIE_OPTIONS, expires });
}
//# sourceMappingURL=cookie-manager.js.map