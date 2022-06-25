import { Router } from 'express';
import { authMw } from './middleware';
import authRouter from './auth-router';
import userRouter from './user-router';
import chatRouter from './chat-router';
import sqlRouter from './sql-router';


// Init
const apiRouter = Router();

// Add api routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/sql', sqlRouter);
apiRouter.use('/users', authMw, userRouter);
apiRouter.use('/chat', authMw, chatRouter)

// Export default
export default apiRouter;
