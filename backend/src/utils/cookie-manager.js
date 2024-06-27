"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserCookie = exports.deleteCookie = void 0;
var constants_js_1 = require("../constants/constants.js");
var token_manager_js_1 = require("./token-manager.js");
/**
 * Clears a specific cookie from the client browser.
 *
 * @param {Response} res - The Express response object used to send the clear cookie command to the client.
 */
function deleteCookie(res) {
    res.clearCookie(constants_js_1.COOKIE.NAME, constants_js_1.COOKIE_OPTIONS);
}
exports.deleteCookie = deleteCookie;
/**
 * Manages user session cookies by refreshing or setting a new cookie.
 *
 * @param {Response} res - The Express response object used to manage cookies in the client's browser.
 * @param {any} user - The user object from which the user ID and email are extracted for token creation.
 */
function handleUserCookie(res, user) {
    deleteCookie(res);
    var token = (0, token_manager_js_1.createToken)(user._id.toString(), user.email, constants_js_1.COOKIE.EXPIRES_IN);
    var expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(constants_js_1.COOKIE.NAME, token, __assign(__assign({}, constants_js_1.COOKIE_OPTIONS), { expires: expires }));
}
exports.handleUserCookie = handleUserCookie;
