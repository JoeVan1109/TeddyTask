import modal from './modal.js';
import list from './list.js';
import card from './card.js';
import API from './api.js';

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const lists = await API.getLists(); // Cette fonction doit exister dans ton API
    lists.forEach(listData => {
        const listElem = list.createListElem(listData);
        document.querySelector('#lists-container').appendChild(listElem);

        // Ajout des cards pour chaque liste
        if (listData.cards && Array.isArray(listData.cards)) {
            listData.cards.forEach(cardData => {
                const cardElem = card.createCardElem(cardData); // Adapte selon ta fonction
                listElem.querySelector('.message-body').appendChild(cardElem);
            });
        }
    });

    list.initLists();
    modal.initModals();
});