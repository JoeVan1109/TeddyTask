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
        // le clone d'un template n'est pas un element html mais un fragment de document
        // (une sorte de mono dom, qui n'est pas dans le dom)
        // pour accéder directement à l'élement html, il faut le selectionner.
        const listClone = listTemplate.content.cloneNode(true).querySelector('section');
        listClone.querySelector('[slot="list-title"]').textContent = data.title;
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
        const modal = document.querySelector('#modify-list-modal');
        modal.dataset.id = event.currentTarget.closest('section').dataset.id;
        modal.querySelector('input[name="title"]').value = 
        event.currentTarget.closest('section').querySelector('[slot="list-title"]').textContent;
        modal.classList.add('is-active');
    },

    onAddCardClick(event){
        const modal = document.querySelector('#add-card-modal');
        modal.dataset.id = event.currentTarget.closest('section').dataset.id;
        modal.classList.add('is-active');
    },
};

export default list;