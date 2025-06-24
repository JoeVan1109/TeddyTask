import Sortable from 'sortablejs';
import API from './api.js';
import modal from './modal.js';
import tag from './tag.js';
import utils from './utils.js';

const card = {

    // Initialize cards
    initCards(listElem, cards){
        const sortedCards = [...cards].sort((a, b) => a.position - b.position);
        const cardContainer = listElem.querySelector('.message-body');
        sortedCards.forEach(cardData => {
            const cardElem = card.createCardElem(cardData);
            cardContainer.appendChild(cardElem);
        });
    },
    
    // ...existing code...
    createCardElem(data){
        const cardTemplate = document.querySelector('#card-template');
        const cardClone = cardTemplate.content.cloneNode(true).querySelector('article');
        cardClone.querySelector('[slot="card-title"]').textContent = data.title;
        cardClone.querySelector('[slot="card-content"]').textContent = data.content;
        cardClone.querySelector('.card-color').style.backgroundColor = data.color;
        const dateElem = cardClone.querySelector('[slot="card-date"]');
        dateElem.textContent = data.date ? new Date(data.date).toLocaleDateString() : '';
        cardClone.querySelector('.modify-card-btn').addEventListener('click', card.onModifyCardClick);
        cardClone.querySelector('.delete-card-btn').addEventListener('click', card.onDeleteCardClick);
        cardClone.querySelector('.add-tag-btn').addEventListener('click', card.onAddTagClick);
        cardClone.dataset.id = data.id;
        if(data.tags?.length){
            tag.initTags(cardClone, data.tags);
        }
        return cardClone;
    },
// ...existing code...
    
    // Initialize sortable cards
    // This function is called when the list is created
    initSortableCards(listElem){
        const cardContainer = listElem.querySelector('.message-body');
        Sortable.create(cardContainer, {
            animation: 150,
            group: 'cards',
            onEnd: async (event) => {
                const cardId = event.item.dataset.id;
                const newListId = event.to.closest('section').dataset.id;
                const container = event.to.parentElement;
                const cards = container.querySelectorAll('.card');
                await API.modifyCard(cardId, { list_id: newListId });
                cards.forEach(async (card, index) => {
                const { id } = card.dataset;
                const newPosition = index + 1;
                await API.modifyCard(id, { position: newPosition });
                });
            },
        });
    },
    
    // Modify card
    onModifyCardClick(event){
        const modal = document.querySelector('#modify-card-modal');
        modal.dataset.id = event.currentTarget.closest('.card').dataset.id;
        modal.querySelector('input[name="title"]').value = 
            event.currentTarget.closest('article').querySelector('[slot="card-title"]').textContent;
        modal.querySelector('textarea[name="content"]').value = 
            event.currentTarget.closest('article').querySelector('[slot="card-content"]').textContent;
        const color = event.currentTarget.closest('article').querySelector('.card-color').style.backgroundColor;
        modal.querySelector('input[name="color"]').value = utils.rgb2Hex(color);
        modal.classList.add('is-active');
    },
    
    // Delete card
    deleteCardElem(id){
        const cardToDelete = document.querySelector(`.card[data-id="${id}"]`);
        cardToDelete.remove();
    },
    
    // Delete card event
    onDeleteCardClick(event){
        const cardId = event.currentTarget.closest('.card').dataset.id;
        modal.initConfirmModal('Êtes vous sûr de vouloir supprimer cette carte ?', async () => {
            const result = await API.deleteCard(cardId);
            if(result){
                card.deleteCardElem(cardId);
            }
        });
    },
    
    // Add tag event
    // This function is called when the add tag button is clicked
    onAddTagClick(event){
        const cardId = event.currentTarget.closest('.card').dataset.id;
        modal.initTagModal(cardId);
    },
};

export default card;