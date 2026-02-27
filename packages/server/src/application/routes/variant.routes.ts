import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createVariantSchema, searchVariantsSchema } from '@cellstore/shared';
import type { VariantController } from '../controllers/VariantController';

export function createVariantRoutes(controller: VariantController): Router {
  const router = Router();

  router.get('/', validate(searchVariantsSchema, 'query'), controller.search);
  router.get('/search', validate(searchVariantsSchema, 'query'), controller.search);
  router.post('/', validate(createVariantSchema), controller.create);

  return router;
}
