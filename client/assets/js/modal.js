import API from './api.js';
import list from './list.js';
import card from './card.js';
import tag from './tag.js';
import { toast } from './toast.js';


const modal = {

    // Initializing modals

    initModals() {
        const closeModalElems = document.querySelectorAll('.modal-background, .modal .button-close');
        closeModalElems.forEach((elem) => elem.addEventListener('click', modal.closeActiveModal));
        modal.initAddListModalForm();
        modal.initModifyListModalForm();
        modal.initAddCardModalForm();
        modal.initModifyCardModalForm();
    },

    // Close modal

    closeActiveModal(){
        const activeModal = document.querySelector('.modal.is-active');
        if(activeModal){
            const formElem = activeModal.querySelector('form');
            if(formElem){
                formElem.reset();
            }
            activeModal.classList.remove('is-active');
        }
    },
    
    // Initialize error modal

    initErrorModal(error){
        modal.closeActiveModal();
        const errorModal = document.querySelector('#error-modal');
        const errorModalTitleElem = errorModal.querySelector('[slot="error-title"]');
        const errorModalMessageElem = errorModal.querySelector('[slot="error-message"]');
        errorModalTitleElem.textContent = error.status ? `Erreur ${error.status}` : 'Erreur';
        errorModalMessageElem.textContent = error.message;
        errorModal.classList.add('is-active');
    },

    // Initialize add list modal form
    
    initAddListModalForm(){
        const formElem = document.querySelector('#add-list-modal form');
        formElem.addEventListener('submit', onAddListFormSubmit);
        async function onAddListFormSubmit(event){
            event.preventDefault();
            const formData = new FormData(formElem);
            const newListData = await API.createList(Object.fromEntries(formData));
            if(newListData){
                const listElem = list.createListElem(newListData);
                document.querySelector('#lists-container').appendChild(listElem);
                formElem.reset();
                modal.closeActiveModal();
                toast('Liste créée','is-success');
            }
        }
    },

    // Initialize modify list modal form
    
    initModifyListModalForm(){
        const modifyModal = document.querySelector('#modify-list-modal');
        const formElem =  modifyModal.querySelector('form');
        formElem.addEventListener('submit', onModifyListFormSubmit);
        async function onModifyListFormSubmit(event){
            event.preventDefault();
            const id = modifyModal.dataset.id;
            const formData = new FormData(formElem);
            const newListData = await API.modifyList(id, Object.fromEntries(formData));
            if(newListData){
                document.querySelector(`section[data-id="${id}"] [slot="list-title"]`).textContent = newListData.title;
                formElem.reset();
                modal.closeActiveModal();
                toast('Liste Modifiée','is-success');
            }
        }
    },
    
    // Initialize add card modal form

    initAddCardModalForm(){
        const addCardModal = document.querySelector('#add-card-modal');
        const formElem =  addCardModal.querySelector('form');
        formElem.addEventListener('submit', onAddCardFormSubmit);
        async function onAddCardFormSubmit(event){
            event.preventDefault();
            const id = addCardModal.dataset.id;
            const formData = new FormData(formElem);
            const data = Object.fromEntries(formData);
            data.list_id = id;
            const newCardData = await API.createCard(data);
            if(newCardData){
                const cardContainer = document.querySelector(`section[data-id="${id}"] .message-body`);
                const newCardElem = card.createCardElem(newCardData);
                cardContainer.appendChild(newCardElem);
                formElem.reset();
                modal.closeActiveModal();
                toast('Carte Créée','is-success');
            }
        }
    },
    

    // Initialize modify card modal form

    initModifyCardModalForm(){
        const modifyCardModal = document.querySelector('#modify-card-modal');
        const formElem =  modifyCardModal.querySelector('form');
        formElem.addEventListener('submit', onModifyCardFormSubmit);
        async function onModifyCardFormSubmit(event){
            event.preventDefault();
            const id = modifyCardModal.dataset.id;
            const formData = new FormData(formElem);
            const data = Object.fromEntries(formData);
            const modifiedCardData = await API.modifyCard(id,data);
            if(modifiedCardData){
                const card = document.querySelector(`.card[data-id="${id}"]`);
                card.querySelector('[slot="card-title"]').textContent = modifiedCardData.title;
                card.querySelector('[slot="card-content"]').textContent = modifiedCardData.content;
                card.querySelector('.card-color').style.backgroundColor = data.color;
                formElem.reset();
                modal.closeActiveModal();
                toast('Carte Modifiée','is-success');
            }
        }
    },

    // Initialize confirm modal
    
    initConfirmModal(message, callback){
        const confirmModal = document.querySelector('#confirm-modal');
        const confirmBtn = confirmModal.querySelector('button.is-success');
        const closeBtn = confirmModal.querySelector('.button.close');
        closeBtn.removeEventListener('click', modal.onConfirmModalClose);
        confirmModal.querySelector('[slot="confirm-message"]').textContent = message;
        confirmBtn.addEventListener('click', () => {
            confirmBtn.replaceWith(confirmBtn.cloneNode(true)); // remplace le bouton par une copie du bouton, afin de ne pas conserver de gestionnaires d'événements résiduels
                modal.closeActiveModal();
                callback();
        });
        closeBtn.addEventListener('click', modal.onConfirmModalClose);
        confirmModal.classList.add('is-active');
    },

        // Close confirm modal
    
    onConfirmModalClose(){
        const confirmBtn = document.querySelector('#confirm-modal button.is-success');
        confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    },
    

    // Initialize tag modal

    async initTagModal(cardId){
        const tagModal = document.querySelector('#tag-modal');
        const tagContainer = tagModal.querySelector('[slot="tags-container"]');
        const closeBtn = tagModal.querySelector('.button.close');
        closeBtn.removeEventListener('click', modal.onTagModalClose);
        tagContainer.innerHTML = '';
        tagModal.dataset.id = cardId;
        // récupérer tous les tags
        const tags = await API.getTags();
        // récupérer la carte
        const cardData = await API.getCard(cardId);
        // récupérer les tags de la carte
        const cardTags = cardData.tags ? cardData.tags : [];
        // les afficher
        tags.forEach(tagData => {
            const tagElem = document.createElement('button');
            tagElem.dataset.id = tagData.id;
            tagElem.textContent = tagData.name;
            tagElem.classList.add('button','is-primary','is-outlined');
            // signaler ceux déjà présent sur la carte
            if(cardTags.find(cardTag => cardTag.id === tagData.id)){
                tagElem.classList.remove('is-outlined');
            }
            tagElem.addEventListener('click',(event)=>{
                event.currentTarget.classList.toggle('is-outlined');
            });
            tagContainer.appendChild(tagElem);
        });
        closeBtn.addEventListener('click', modal.onTagModalClose);
        tagModal.classList.add('is-active');
    },

    // Close tag modal
    
    async onTagModalClose(event){
        const tagModal = event.currentTarget.closest('.modal');
        const cardId = tagModal.dataset.id;
        const cardElem = document.querySelector(`.card[data-id="${cardId}"]`);
        const tagButtons = [...tagModal.querySelectorAll('[slot="tags-container"] button')];
        const tagElems = [...cardElem.querySelectorAll('.tag[data-id]')];
        const cardTagsContainer = cardElem.querySelector('[slot="card-tags"]');
        const tagsData = await API.getTags();
    
        for(const tagButton of tagButtons){
            let tagElem = tagElems.find(tagElem => tagElem.dataset.id === tagButton.dataset.id);
            if(tagButton.classList.contains('is-outlined')){
                await API.dissociateCardFromTag(cardId, tagButton.dataset.id);
                if(tagElem){
                tagElem.remove();
                }
            } else {
                await API.associateCardToTag(cardId, tagButton.dataset.id);
                if(!tagElem){
                tagElem = tag.createTagElem(tagsData.find(tagData => tagData.id === parseInt(tagButton.dataset.id, 10)));
                cardTagsContainer.prepend(tagElem);
                }
            }
        }
    
        toast('Tags modifiés','is-success');
    },
}

export default modal;