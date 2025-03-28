import { Tag } from '../models/index.js';
import { HttpError } from '../error/httperror.js';

export const tagController = {
    getAll: async(req, res)=>{
        const tags = await Tag.findAll();
        res.json(tags);
    },

    getOne:async (req, res)=>{
        const { id: tagId } = req.params;
        const selectedTag = await Tag.findByPk(tagId);
        if(!selectedTag){
        throw new HttpError(404, 'Tag not found. Please verify the provided ID.');
        }
        res.json(selectedTag);
    },

    createOne: async(req, res)=>{
        const newTag = await Tag.create(req.body);
        res.status(201).json(newTag);
    },

    patchOne: async (req, res) => {
        const { id: tagId } = req.params;
        const selectedTag = await Tag.findByPk(tagId);
        if(!selectedTag){
        throw new HttpError(404, 'Tag not found. Please verify the provided ID.');
        }
        Object.assign(selectedTag, req.body);
        await selectedTag.save();
        res.json(selectedTag);
    },

    deleteOne: async (req, res)=> {
        const { id: tagId } = req.params;
        const selectedTag = await Tag.findByPk(tagId);
        if(!selectedTag){
        throw new HttpError(404, 'Tag not found. Please verify the provided ID.');
        }
        await selectedTag.destroy();
        res.status(204).end();
    },
};