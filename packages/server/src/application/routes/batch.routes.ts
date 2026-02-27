import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createBatchSchema } from '@cellstore/shared';
import type { BatchController } from '../controllers/BatchController';

export function createBatchRoutes(controller: BatchController): Router {
  const router = Router();

  router.get('/', controller.list);
  router.post('/', validate(createBatchSchema), controller.create);

  return router;
}
