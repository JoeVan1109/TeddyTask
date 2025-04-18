const tag = {

    // Initialize tags
    initTags(cardElem, tags){
        tags.forEach(
            tagData => {
            cardElem.querySelector('[slot="card-tags"]').prepend(tag.createTagElem(tagData));
            }
        );
    },

    // Create a tag
    createTagElem(data){
        const tagTemplate = document.querySelector('#tag-template');
        const tagClone = tagTemplate.content.cloneNode(true).querySelector('.tag');
        tagClone.querySelector('[slot="tag-name"]').textContent = data.name;
        tagClone.style.backgroundColor = data.color;
        tagClone.dataset.id = data.id;
        return tagClone;
    },
};

export default tag;
