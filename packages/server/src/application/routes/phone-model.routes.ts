import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createPhoneModelSchema } from '@cellstore/shared';
import type { PhoneModelController } from '../controllers/PhoneModelController';

export function createPhoneModelRoutes(controller: PhoneModelController): Router {
  const router = Router();

  router.get('/', controller.list);
  router.post('/', validate(createPhoneModelSchema), controller.create);

  return router;
}
