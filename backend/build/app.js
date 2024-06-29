"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const index_js_1 = __importDefault(require("./routes/index.js"));
const constants_js_1 = require("./constants/constants.js");
/**
 * Load environment variables from .env file into process.env
 */
(0, dotenv_1.config)();
/**
 * Initializes main Express application
 */
const app = (0, express_1.default)();
/**
 * Retrieve CORS origin URL and cookie secret key from environment variables
 */
const corsOrigin = process.env.CORS_ORIGIN;
const privateCookieKey = process.env.COOKIE_PRIVATE_KEY;
/**
 * Middleware for handling Cross-Origin Resource Sharing (CORS).
 * Configures the CORS policy of the application to allow requests from the specified origin
 * and to handle credentials like cookies and headers properly.
 */
app.use((0, cors_1.default)({
    origin: corsOrigin,
    credentials: true,
    methods: constants_js_1.HTTP_METHODS,
    allowedHeaders: constants_js_1.ALLOWED_HEADERS,
}));
/**
 * Built-in middleware to parse incoming requests with JSON payloads.
 * This is necessary for the application to properly read and understand JSON formatted request bodies.
 */
app.use(express_1.default.json());
/**
 * Middleware to parse cookies from the HTTP Request.
 * Uses a private key from environment variables to parse signed cookies,
 * which helps in securely transmitting sensitive information such as authentication tokens.
 */
app.use((0, cookie_parser_1.default)(privateCookieKey));
/**
 * Serve static files from the React app, assuming the build folder is in the correct relative path
 */
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/dist')));
/**
 * Main application router.
 * Mounts the primary router for the API under the 'ROUTE.API.VERSION,' base path, organizing the application's routing structure.
 */
app.use(constants_js_1.ROUTE.API.VERSION, index_js_1.default);
/**
 * The "catchall" handler for any request that doesn't match one above, send back React's index.html file.
 */
app.get(constants_js_1.ROUTE.GLOBAL.WILDCARD, (req, res) => {
    const filePath = path_1.default.join(__dirname, '../frontend/dist/index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(` ${constants_js_1.ERROR.SERVING.FAIL} index.html ${err.message}`);
            res.status(500).send(err);
        }
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map