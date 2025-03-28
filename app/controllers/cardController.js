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
    }
}