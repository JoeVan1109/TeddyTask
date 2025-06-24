import Joi from 'joi';

// card schema management


export const createSchema = Joi.object({
    title: Joi.string().min(3).required(),
    content: Joi.string().required(),
    color: Joi.string().max(7),
    position: Joi.number().integer(),
    list_id: Joi.number().integer().required(),
});

export const patchSchema = Joi.object({
    title: Joi.string().min(3),
    content: Joi.string(),
    color: Joi.string().max(7),
    position: Joi.number().integer(),
    list_id: Joi.number().integer(),
}).min(1);
