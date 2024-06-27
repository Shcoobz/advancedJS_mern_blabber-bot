"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_js_1 = require("../constants/constants.js");
const user_handler_js_1 = require("../controllers/user-handler.js");
/**
 * Generates a JWT (JSON Web Token) for a user.
 *
 * @param {string} id - The user ID to be included in the token payload.
 * @param {string} email - The user email to be included in the token payload.
 * @param {string} expiresIn - The expiration time for the token (e.g., '1h', '7d').
 * @returns {string} - The signed JWT.
 *
 * @throws {Error} - Throws an error if the private key is not defined in the environment variables.
 */
function createToken(id, email, expiresIn) {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const payload = { id, email };
    const token = jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn });
    return token;
}
exports.createToken = createToken;
/**
 * Middleware to verify JWT tokens stored in signed cookies.
 *
 * @param {Request} req - The request object, which should contain a signed cookie with the JWT token.
 * @param {Response} res - The response object used to send responses back to the client.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
async function verifyToken(req, res, next) {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = req.signedCookies[`${constants_js_1.COOKIE.NAME}`];
    if (!token || token.trim() === constants_js_1.EMPTY_STRING) {
        return (0, user_handler_js_1.sendErrorResponse)(res, new Error(constants_js_1.ERROR.TOKEN.NOT_RECEIVED), 401);
    }
    try {
        const decoded = await jsonwebtoken_1.default.verify(token, privateKey);
        res.locals.jwtData = decoded;
        next();
    }
    catch (err) {
        console.error(constants_js_1.ERROR.TOKEN.VERIFICATION_FAILED, err);
        return (0, user_handler_js_1.sendErrorResponse)(res, new Error(constants_js_1.ERROR.TOKEN.EXPIRED), 401);
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=token-manager.js.map