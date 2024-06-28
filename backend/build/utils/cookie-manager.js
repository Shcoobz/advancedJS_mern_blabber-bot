"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCookie = deleteCookie;
exports.handleUserCookie = handleUserCookie;
const constants_js_1 = require("../constants/constants.js");
const token_manager_js_1 = require("./token-manager.js");
/**
 * Clears a specific cookie from the client browser.
 *
 * @param {Response} res - The Express response object used to send the clear cookie command to the client.
 */
function deleteCookie(res) {
    res.clearCookie(constants_js_1.COOKIE.NAME, constants_js_1.COOKIE_OPTIONS);
}
/**
 * Manages user session cookies by refreshing or setting a new cookie.
 *
 * @param {Response} res - The Express response object used to manage cookies in the client's browser.
 * @param {any} user - The user object from which the user ID and email are extracted for token creation.
 */
function handleUserCookie(res, user) {
    deleteCookie(res);
    const token = (0, token_manager_js_1.createToken)(user._id.toString(), user.email, constants_js_1.COOKIE.EXPIRES_IN);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(constants_js_1.COOKIE.NAME, token, { ...constants_js_1.COOKIE_OPTIONS, expires });
}
//# sourceMappingURL=cookie-manager.js.map