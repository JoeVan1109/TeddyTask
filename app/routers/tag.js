import { Router } from 'express';
import { tagController } from '../controllers/tagController.js';
import { createSchema, patchSchema } from '../validation/tag.js';
import { idSchema } from '../validation/params.js';
import { validate } from '../validation/validate.js';
import { withTryCatch } from '../controllers/withTryCatchController.js';

export const router = Router();

router.get('/', withTryCatch(tagController.getAll));

router.get(
  '/:id',
  validate(idSchema, 'params'),
  withTryCatch(tagController.getOne)
);

router.post(
  '/',
  validate(createSchema, 'body'),
  withTryCatch(tagController.createOne)
);

router.patch(
  '/:id',
  validate(idSchema, 'params'),
  validate(patchSchema, 'body'),
  withTryCatch(tagController.patchOne)
);

router.delete(
  '/:id',
  validate(idSchema, 'params'),
  withTryCatch(tagController.deleteOne)
);