import { Card, Tag } from '../models/index.js';
import { HttpError } from '../error/httperror.js';

export const cardController= {

    getAll: async (req, res) => {
        const cards = await Card.findAll({
            include: 'tags',
        });
        res.json(cards);
    },

    getOne: async (req, res) => {
        const { id: cardId } = req.params;
        const selectedCard = await Card.findByPk(cardId, {
            include: 'tags',
        });

        if(!selectedCard) {
            throw new HttpError(404, `Card with id ${cardId} not found`);
        }

        res.json(selectedCard);
    },

    createOne: async (req, res) => {
        const newCard = await Card.create(req.body);
        res.status(201).json(newCard);
    },

    patchOne: async (req, res) => {
        const { id: cardId } = req.params;
        const selectedCard = await Card.findByPk(cardId);

        if(!selectedCard){
            throw new HttpError(404, 'Card not found. Please verify the provided ID.');
        }

        Object.assign(selectedCard, req.body);
        await selectedCard.save();
        res.json(selectedCard);
    },

    deleteOne: async (req, res) => {
        const { id: cardId } = req.params;
        const selectedCard = await Card.findByPk(cardId);

        if(!selectedCard){
            throw new HttpError(404, 'Card not found. Please verify the provided ID.');
        }

        await selectedCard.destroy();
        res.status(204).end();
    },

    associateOneWithTag: async (req, res) => {
        const { cardId, tagId } = req.params;
        const card = await Card.findByPk(cardId);
        const tag = await Tag.findByPk(tagId);

        if(!card || !tag){
            throw new HttpError(404, 'Card or Tag not found. Please verify the provided ID.');
        }

        await card.addTag(tag);

        const updatedCard = await Card.findByPk(cardId, {
            include: 'tags',
        });
        res.status(201).json(updatedCard);
    },

    dissociateOneFromTag: async(req, res) => {
        const { cardId, tagId } = req.params;
        const card = await Card.findByPk(cardId);
        const tag = await Tag.findByPk(tagId);
        if(!card || !tag){
            throw new HttpError(404, 'Card or tag not found. Please verify the provided IDs.');
        }
        await card.removeTag(tag);
        const updatedCard = await Card.findByPk(cardId,{
            include: 'tags',
        });
        res.status(201).json(updatedCard);
    },
};