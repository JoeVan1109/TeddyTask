import { List } from '../models/index.js';
import { HttpError } from '../error/httperror.js';

export const listController = {
    getAll: async(req, res)=>{
        const lists = await List.findAll({
        include: {
            association: 'cards',
            include: 'tags',
        },
        });
        res.json(lists);
    },

    getOne:async (req, res)=>{
        const { id: listId } = req.params;
        const selectedList = await List.findByPk(listId,{
        include: {
            association: 'cards',
            include: 'tags',
        },
        });
        if(!selectedList){
        throw new HttpError(404, 'List not found. Please verify the provided ID.');
        }
        res.json(selectedList);
    },

    getCards: async (req, res)=> {
        const { id: listId } = req.params;
        const selectedList = await List.findByPk(listId,{
        include: {
            association: 'cards',
            include: 'tags',
        },
        });
        if(!selectedList){
        throw new HttpError(404, 'List not found. Please verify the provided ID.');
        }
        res.json(selectedList.cards);
    },

    createOne: async(req, res)=>{
        const newList = await List.create(req.body);
        res.status(201).json(newList);
    },

    patchOne: async (req, res) => {
        const { id: listId } = req.params;
        const selectedList = await List.findByPk(listId);
        if(!selectedList){
        throw new HttpError(404, 'List not found. Please verify the provided ID.');
        }
        Object.assign(selectedList, req.body);
        await selectedList.save();
        res.json(selectedList);
    },

    deleteOne: async (req, res)=> {
        const { id: listId } = req.params;
        const selectedList = await List.findByPk(listId);
        if(!selectedList){
        throw new HttpError(404, 'List not found. Please verify the provided ID.');
        }
        await selectedList.destroy();
        res.status(204).end();
    },
};