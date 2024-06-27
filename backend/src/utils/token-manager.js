"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var constants_js_1 = require("../constants/constants.js");
var user_handler_js_1 = require("../controllers/user-handler.js");
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
    var privateKey = process.env.JWT_PRIVATE_KEY;
    var payload = { id: id, email: email };
    var token = jsonwebtoken_1.default.sign(payload, privateKey, { expiresIn: expiresIn });
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
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var privateKey, token, decoded, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    privateKey = process.env.JWT_PRIVATE_KEY;
                    token = req.signedCookies["".concat(constants_js_1.COOKIE.NAME)];
                    if (!token || token.trim() === constants_js_1.EMPTY_STRING) {
                        return [2 /*return*/, (0, user_handler_js_1.sendErrorResponse)(res, new Error(constants_js_1.ERROR.TOKEN.NOT_RECEIVED), 401)];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, jsonwebtoken_1.default.verify(token, privateKey)];
                case 2:
                    decoded = _a.sent();
                    res.locals.jwtData = decoded;
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error(constants_js_1.ERROR.TOKEN.VERIFICATION_FAILED, err_1);
                    return [2 /*return*/, (0, user_handler_js_1.sendErrorResponse)(res, new Error(constants_js_1.ERROR.TOKEN.EXPIRED), 401)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.verifyToken = verifyToken;
