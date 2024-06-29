import { Router } from 'express';
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';

/**
 * Create a router instance.
 */
const appRouter = Router();

/**
 * Route Mounting.
 */
appRouter.use('/user', userRoutes);
appRouter.use('/chat', chatRoutes);

export default appRouter;
