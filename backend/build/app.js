"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
/**
 * Configures and initializes the main Express application.
 * Loads environment variables, sets up middlewares for CORS, JSON parsing, cookie parsing,
 * and request logging, and mounts the main router for API endpoints.
 */
// Load environment variables from .env file into process.env
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// Retrieve CORS origin URL and cookie secret key from environment variables
const corsOrigin = process.env.CORS_ORIGIN;
const privateCookieKey = process.env.COOKIE_PRIVATE_KEY;
/**
 * Middleware for handling Cross-Origin Resource Sharing (CORS).
 * Configures the CORS policy of the application to allow requests from the specified origin
 * and to handle credentials like cookies and headers properly.
 */
app.use((0, cors_1.default)({ origin: corsOrigin, credentials: true }));
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
// Serve static files from the React app, assuming the build folder is in the correct relative path
// app.use(express.static(path.join(__dirname, '../frontend/dist')));
const staticPath = path_1.default.join(__dirname, '../../frontend/dist');
console.log(`Serving static files from ${staticPath}`);
app.use(express_1.default.static(staticPath));
/**
 * Main application router.
 * Mounts the primary router for the API under the '/api/v1' base path, organizing the application's routing structure.
 */
app.use('/api/v1', index_js_1.default);
// The "catchall" handler for any request that doesn't match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });
app.get('*', (req, res) => {
    const filePath = path_1.default.join(staticPath, 'index.html');
    console.log(`Serving index.html from ${filePath}`);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(`Error serving index.html: ${err.message}`);
            res.status(500).send(err);
        }
    });
});
app.use((req, res, next) => {
    console.log(`Request URL: ${req.url}`);
    next();
});
exports.default = app;
//# sourceMappingURL=app.js.map