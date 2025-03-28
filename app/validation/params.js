import Joi from 'joi';

// params schema management

export const idSchema = Joi.object({
    id: Joi.number().integer().required(),
});

export const associateSchema = Joi.object({
    cardId: Joi.number().integer().required(),
    tagId: Joi.number().integer().required(),
});