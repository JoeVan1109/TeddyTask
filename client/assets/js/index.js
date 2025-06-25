import modal from './modal.js';
import list from './list.js';
import card from './card.js';
import API from './api.js';

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    

    list.initLists();
    modal.initModals();
});