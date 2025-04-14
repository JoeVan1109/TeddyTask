import { APIBaseURL } from './config.js';
import modal from './modal.js';


// This file makes fetch calls to the API to be able to create, modify, read, and delete lists and cards (CRUD method)
// If there are errors, I return an error modal with the reason of the error

const API = {
    async fetchAPI(path, options) {
        try {
            const url = `${APIBaseURL}${path}`;
            const httpResponse = await fetch(url, options);

            if (httpResponse.status !== 204) {
                const data = await httpResponse.json();
                if (!httpResponse.ok) {
                    return modal.initErrorModal({status:httpResponse.status, message:data.error});
                }

                return data;
            }

            return true;
        } catch (error) {
            return modal.initErrorModal({status:500, message:error.message});
        }
    },

    async getLists() {
        return await API.fetchAPI('/lists');
    },

    async createList(data){
        return await API.fetchAPI('/lists',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },
    
    async modifyList(id, data){
        return await API.fetchAPI(`/lists/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },
    
    async deleteList(id){
        return await API.fetchAPI(`/lists/${id}`,{
            method: 'DELETE',
        });
    },
    
    async createCard(data){
        return await API.fetchAPI('/cards',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },
    
    async getCard(id){
        return await API.fetchAPI(`/cards/${id}`);
    },
    
    async modifyCard(id, data){
        return await API.fetchAPI(`/cards/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    },
    
    async deleteCard(id){
        return await API.fetchAPI(`/cards/${id}`,{
            method: 'DELETE',
        });
    },
    
    async associateCardToTag(cardId, tagId){
        return await API.fetchAPI(`/cards/${cardId}/tags/${tagId}`, {
            method: 'PUT',
        });
    },
    
    async dissociateCardFromTag(cardId, tagId){
        return await API.fetchAPI(`/cards/${cardId}/tags/${tagId}`, {
            method: 'DELETE',
        });
    },
    
    async getTags(){
        return await API.fetchAPI('/tags');
    },
    
    async getTag(id){
        return await API.fetchAPI(`/tags/${id}`);
    },
};

export default API;