import Joi from 'joi';

// list schema management

export const createSchema = Joi.object({
    title: Joi.string().min(3).required(),

    position: Joi.number().integer(),
    date: Joi.string().isoDate(),
});

export const patchSchema = Joi.object({
    title: Joi.string().min(3),
    position: Joi.number().integer(),
    date: Joi.string().isoDate(),
}).min(1);
