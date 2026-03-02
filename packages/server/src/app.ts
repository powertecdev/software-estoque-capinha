import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './infrastructure/config/env';
import { errorHandler } from './application/middlewares/error-handler';
import { router } from './application/routes';

export function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use('/api/v1', router);
  app.use(errorHandler);
  return app;
}