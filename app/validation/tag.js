import Joi from 'joi';

// tag schema management

export const createSchema = Joi.object({
    name: Joi.string().min(3).required(),
    color: Joi.string().length(7),
});

export const patchSchema = Joi.object({
    name: Joi.string().min(3),
    color: Joi.string().length(7),
}).min(1);
