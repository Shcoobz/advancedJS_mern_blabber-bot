import express from 'express';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
config();
const app = express();
const corsOrigin = process.env.CORS_ORIGIN;
const privateCookieKey = process.env.COOKIE_PRIVATE_KEY;
// middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser(privateCookieKey));
// remove in production
app.use(morgan('dev'));
app.use('/api/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map