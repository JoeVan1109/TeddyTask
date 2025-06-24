import Sortable from 'sortablejs';
import API from './api.js';
import modal from './modal.js';
import card from './card.js';

const list = {
    initLists(){
        list.initAddListBtn();
        list.initSortableLists();
        list.fetchLists();
    },

    initSortableLists(){
        const listContainer = document.querySelector('#lists-container');
        Sortable.create(listContainer, {
        animation: 150,
        handle:'.message-header',
        onEnd: async () => {
            const listElems = [...document.querySelectorAll('#lists-container section')];
            listElems.forEach(async (listElem, index) => {
            await API.modifyList(
                listElem.dataset.id,
                { position: index + 1 }
            );
            });
        },
        });
    },

    initAddListBtn(){
        const addListBtn = document.querySelector('#add-list-btn');
        addListBtn.addEventListener('click', onAddListBtnClick);
        function onAddListBtnClick(){
        const modal = document.querySelector('#add-list-modal');
        modal.classList.add('is-active');
        }
    },

    async fetchLists(){
        let lists = await API.getLists();
        if(lists){
        lists.sort((a, b) => a.position - b.position);
        lists.forEach(listData => {
            const listElem = list.createListElem(listData);
            document.querySelector('#lists-container').appendChild(listElem);
        });
        }
    },

    createListElem(data){
        const listTemplate = document.querySelector('#list-template');
        const listClone = listTemplate.content.cloneNode(true).querySelector('section');
        listClone.querySelector('[slot="list-title"]').textContent = data.title;
        const dateElem = listClone.querySelector('[slot="list-date"]');
        dateElem.textContent = data.date ? new Date(data.date).toLocaleDateString() : '';
        dateElem.dataset.rawDate = data.date || '';
        // ...le reste du code...
        listClone.querySelector('.delete-list-btn').addEventListener('click', list.onDeleteListClick);
        listClone.querySelector('.modify-list-btn').addEventListener('click', list.onModifyListClick);
        listClone.querySelector('.add-card-btn').addEventListener('click', list.onAddCardClick);
        listClone.dataset.id = data.id;
        if(data.cards?.length){
            card.initCards(listClone, data.cards);
        }
        card.initSortableCards(listClone);
        return listClone;
    },

    deleteListElem(id){
        const listToDelete = document.querySelector(`section[data-id="${id}"]`);
        listToDelete.remove();
    },

    async onDeleteListClick(event){
        const listId = event.currentTarget.closest('section').dataset.id;
        modal.initConfirmModal('Êtes vous sûr de vouloir supprimer cette liste et les cartes qu\'elle contient ?', async () => {
        const result = await API.deleteList(listId);
        if(result){
            list.deleteListElem(listId);
        }
        });
    },

    onModifyListClick(event){
        const modalElem = document.querySelector('#modify-list-modal');
        const section = event.currentTarget.closest('section');
        modalElem.dataset.id = section.dataset.id;
        modalElem.querySelector('input[name="title"]').value = section.querySelector('[slot="list-title"]').textContent;
        // Utilise la vraie date stockée dans data-raw-date
        const rawDate = section.querySelector('[slot="list-date"]').dataset.rawDate;
        modalElem.querySelector('input[name="date"]').value = rawDate ? rawDate.substring(0,10) : '';
        modalElem.classList.add('is-active');
    },

    onAddCardClick(event){
        const modal = document.querySelector('#add-card-modal');
        modal.dataset.id = event.currentTarget.closest('section').dataset.id;
        modal.classList.add('is-active');
    },
};

export default list;