import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { config } from 'dotenv';

import appRouter from './routes/index.js';
import { ALLOWED_HEADERS, ERROR, HTTP_METHODS, ROUTE } from './constants/constants.js';

/**
 * Load environment variables from .env file into process.env
 */
config();

/**
 * Initializes main Express application
 */
const app = express();

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
app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
    methods: HTTP_METHODS,
    allowedHeaders: ALLOWED_HEADERS,
  })
);

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
 * Serve static files from the React app, assuming the build folder is in the correct relative path
 */
console.log('Serving static files from:', path.join(__dirname, '../frontend/dist'));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

/**
 * Main application router.
 * Mounts the primary router for the API under the 'ROUTE.API.VERSION,' base path, organizing the application's routing structure.
 */
app.use(ROUTE.API.VERSION, appRouter);

/**
 * The "catchall" handler for any request that doesn't match one above, send back React's index.html file.
 */
app.get(ROUTE.GLOBAL.WILDCARD, (req, res) => {
  const filePath = path.join(__dirname, '../frontend/dist/index.html');
  console.log('Serving index.html from:', filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(` ${ERROR.SERVING.FAIL} index.html ${err.message}`);
      res.status(500).send(err);
    }
  });
});

export default app;
