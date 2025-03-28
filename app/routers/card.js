import { Router } from 'express';
import { cardController } from '../controllers/cardController.js';
import { createSchema, patchSchema } from '../validation/card.js';
import { idSchema, associateSchema } from '../validation/params.js';
import { validate } from '../validation/validate.js';

export const router = Router();

router.get('/', withTryCatch(cardController.getAll));

router.get(
    '/:id',
    validate(idSchema, 'params'),
    withTryCatch(cardController.getOne)
);

router.post(
    '/',
    validate(createSchema, 'body'),
    withTryCatch(cardController.createOne)
);

router.patch(
    '/:id',
    validate(idSchema, 'params'),
    validate(patchSchema, 'body'),
    withTryCatch(cardController.patchOne)
);

router.delete(
    '/:id',
    validate(idSchema, 'params'),
    withTryCatch(cardController.deleteOne)
);

router.put(
    '/:cardId/tags/:tagId',
    validate(associateSchema, 'params'),
    withTryCatch(cardController.associateOneWithTag)
);

router.delete(
    '/:cardId/tags/:tagId',
    validate(associateSchema, 'params'),
    withTryCatch(cardController.dissociateOneFromTag)
);
