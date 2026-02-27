import { Router } from 'express';
import { createContainer } from '../../container.js'º;
import { validate } from '../middlewares/validate.js'º;
import { createCategorySchema, updateCategorySchema, createPhoneModelSchema, updatePhoneModelSchema, createSlotSchema, updateSlotSchema, createProductSchema, updateProductSchema, createMovementSchema } from '@cellstore/shared';

const router = Router();
const c = createContainer();

router.get('/health', (_req, res) => { res.json({ status: 'ok', timestamp: new Date().toISOString() }); });

// Categories CRUD
router.get('/categories', (req, res, next) => { c.categoryCtrl.list(req, res).catch(next); });
router.post('/categories', validate(createCategorySchema), (req, res, next) => { c.categoryCtrl.create(req, res).catch(next); });
router.put('/categories/:id', validate(updateCategorySchema), (req, res, next) => { c.categoryCtrl.update(req, res).catch(next); });
router.delete('/categories/:id', (req, res, next) => { c.categoryCtrl.remove(req, res).catch(next); });

// Phone Models CRUD
router.get('/phone-models', (req, res, next) => { c.phoneModelCtrl.list(req, res).catch(next); });
router.post('/phone-models', validate(createPhoneModelSchema), (req, res, next) => { c.phoneModelCtrl.create(req, res).catch(next); });
router.put('/phone-models/:id', validate(updatePhoneModelSchema), (req, res, next) => { c.phoneModelCtrl.update(req, res).catch(next); });
router.delete('/phone-models/:id', (req, res, next) => { c.phoneModelCtrl.remove(req, res).catch(next); });

// Slots CRUD
router.get('/slots', (req, res, next) => { c.slotCtrl.list(req, res).catch(next); });
router.post('/slots', validate(createSlotSchema), (req, res, next) => { c.slotCtrl.create(req, res).catch(next); });
router.put('/slots/:id', validate(updateSlotSchema), (req, res, next) => { c.slotCtrl.update(req, res).catch(next); });
router.delete('/slots/:id', (req, res, next) => { c.slotCtrl.remove(req, res).catch(next); });

// Products CRUD
router.get('/products', (req, res, next) => { c.productCtrl.search(req, res).catch(next); });
router.post('/products', validate(createProductSchema), (req, res, next) => { c.productCtrl.create(req, res).catch(next); });
router.put('/products/:id', validate(updateProductSchema), (req, res, next) => { c.productCtrl.update(req, res).catch(next); });
router.delete('/products/:id', (req, res, next) => { c.productCtrl.remove(req, res).catch(next); });

// Stock Movements
router.get('/movements', (req, res, next) => { c.movementCtrl.list(req, res).catch(next); });
router.get('/movements/product/:productId', (req, res, next) => { c.movementCtrl.byProduct(req, res).catch(next); });
router.post('/movements', validate(createMovementSchema), (req, res, next) => { c.movementCtrl.create(req, res).catch(next); });

export { router };