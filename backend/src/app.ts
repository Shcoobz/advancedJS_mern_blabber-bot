import express from 'express';
import path from 'path';
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

// Serve static files from the React app, assuming the build folder is in the correct relative path
// app.use(express.static(path.join(__dirname, '../frontend/dist')));

const staticPath = path.join(__dirname, '../../frontend/dist');
console.log(`Serving static files from ${staticPath}`);
app.use(express.static(staticPath));

/**
 * Main application router.
 * Mounts the primary router for the API under the '/api/v1' base path, organizing the application's routing structure.
 */
app.use('/api/v1', appRouter);

// The "catchall" handler for any request that doesn't match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });

app.get('*', (req, res) => {
  const filePath = path.join(staticPath, 'index.html');
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

export default app;
