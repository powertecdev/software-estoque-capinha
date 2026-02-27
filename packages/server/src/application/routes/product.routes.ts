import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createProductSchema } from '@cellstore/shared';
import type { ProductController } from '../controllers/ProductController';

export function createProductRoutes(controller: ProductController): Router {
  const router = Router();

  router.get('/', controller.list);
  router.get('/:id', controller.getById);
  router.post('/', validate(createProductSchema), controller.create);

  return router;
}
