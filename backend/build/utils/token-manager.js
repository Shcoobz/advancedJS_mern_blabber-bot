"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_js_1 = require("../constants/constants.js");
const user_handler_js_1 = require("../controllers/user-handler.js");
/**
 * Generates a JWT (JSON Web Token) for a user.
 */
function createToken(id, email, expiresIn) {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const payload = { id, email };
    const token = jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn });
    return token;
}
/**
 * Middleware to verify JWT tokens stored in signed cookies.
 */
async function verifyToken(req, res, next) {
    const privateKey = process.env.JWT_PRIVATE_KEY;
    const token = req.signedCookies[`${constants_js_1.COOKIE.NAME}`];
    if (!token || token.trim() === constants_js_1.EMPTY_STRING) {
        const errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, new Error(constants_js_1.ERROR.TOKEN.NOT_RECEIVED), 401);
        return errorResponse;
    }
    try {
        const decoded = await jsonwebtoken_1.default.verify(token, privateKey);
        res.locals.jwtData = decoded;
        next();
    }
    catch (err) {
        console.error(constants_js_1.ERROR.TOKEN.VERIFICATION_FAILED, err);
        const errorResponse = (0, user_handler_js_1.sendErrorResponse)(res, new Error(constants_js_1.ERROR.TOKEN.EXPIRED), 401);
        return errorResponse;
    }
}
//# sourceMappingURL=token-manager.js.map