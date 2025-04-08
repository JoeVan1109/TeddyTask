import { Router } from 'express';
import { errorHandler } from '../error/errorhandler.js';
import { router as listRouter } from './list.js';
import { router as cardRouter } from './card.js';
import { router as tagRouter } from './tag.js';
import { HttpError } from '../error/httperror.js';

export const router = Router();

router.use('/lists', listRouter);
router.use('/cards', cardRouter);
router.use('/tags', tagRouter);

router.use((req, res, next)=>{
    next(new HttpError(404, 'Resource not found'));
});

router.use(errorHandler);