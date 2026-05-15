import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { USER_BASE_ROUTE } from './modules/users/user.constants';
import { userRouter } from './modules/users/user.routes';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.use(USER_BASE_ROUTE, userRouter);

  app.get('/', (_req: Request, res: Response) => {
    res.json({ message: 'User configuration API is running', baseRoute: USER_BASE_ROUTE });
  });

  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Route not found' });
  });

  app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error(error);
    res.status(500).json({ message: error.message ?? 'Internal server error' });
  });

  return app;
}
