import { Router } from 'express';
import { listController } from '../controllers/listController.js';
import { createSchema, patchSchema } from '../validation/list.js';
import { idSchema } from '../validation/params.js';
import { validate } from '../validation/validate.js';
import { withTryCatch } from '../controllers/withTryCatchController.js';

export const router = Router();

router.get(
    '/', 
    withTryCatch(listController.getAll)
);

router.get(
    '/:id', 
    validate(idSchema, 'params'), 
    withTryCatch(listController.getOne)
);

router.get(
    '/:id/cards', 
    validate(idSchema, 'params'), 
    withTryCatch(listController.getCards)
);

router.post(
    '/', 
    validate(createSchema, 'body'), 
    withTryCatch(listController.createOne)
);

router.patch(
    '/:id', 
    validate(idSchema, 'params'), 
    validate(patchSchema, 'body'), 
    withTryCatch(listController.patchOne)
);

router.delete(
    '/:id', 
    validate(idSchema, 'params'), 
    withTryCatch(listController.deleteOne)
);


