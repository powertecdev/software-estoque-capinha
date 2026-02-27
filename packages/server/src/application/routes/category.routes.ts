import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createCategorySchema } from '@cellstore/shared';
import type { CategoryController } from '../controllers/CategoryController';

export function createCategoryRoutes(controller: CategoryController): Router {
  const router = Router();

  router.get('/', controller.list);
  router.post('/', validate(createCategorySchema), controller.create);

  return router;
}
