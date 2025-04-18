import modal from './modal.js';
import list from './list.js';


// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    list.initLists();
    modal.initModals();
});
