import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
/**
 * Configures and initializes the main Express application.
 * Loads environment variables, sets up middlewares for CORS, JSON parsing, cookie parsing,
 * and request logging, and mounts the main router for API endpoints.
 */
// Load environment variables from .env file into process.env
config();
const app = express();
// Retrieve CORS origin URL and cookie secret key from environment variables
const corsOrigin = process.env.CORS_ORIGIN;
const privateCookieKey = process.env.COOKIE_PRIVATE_KEY;
/**
 * Middleware for handling Cross-Origin Resource Sharing (CORS).
 * Configures the CORS policy of the application to allow requests from the specified origin
 * and to handle credentials like cookies and headers properly.
 */
app.use(cors({ origin: corsOrigin, credentials: true }));
/**
 * Built-in middleware to parse incoming requests with JSON payloads.
 * This is necessary for the application to properly read and understand JSON formatted request bodies.
 */
app.use(express.json());
/**
 * Middleware to parse cookies from the HTTP Request.
 * Uses a private key from environment variables to parse signed cookies,
 * which helps in securely transmitting sensitive information such as authentication tokens.
 */
app.use(cookieParser(privateCookieKey));
/**
 * Middleware to log HTTP requests.
 * 'morgan' is configured to the 'dev' format which provides concise output colored by response status for development use.
 * It should be removed or reconfigured in production environments.
 */
app.use(morgan('dev'));
/**
 * Main application router.
 * Mounts the primary router for the API under the '/api/v1' base path, organizing the application's routing structure.
 */
app.use('/api/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map