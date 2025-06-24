import modal from './modal.js';
import list from './list.js';
import API from './api.js';


// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    const lists = await API.getLists(); // Cette fonction doit exister dans ton API
    lists.forEach(listData => {
        const listElem = list.createListElem(listData);
        document.querySelector('#lists-container').appendChild(listElem);
    });
    list.initLists();
    modal.initModals();
});
