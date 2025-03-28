import { List } from './list.js';
import { Card } from './card.js';
import { Tag } from './tag.js';
import { client } from './client.js';

List.hasMany(Card, {
    as: 'cards',
    foreignKey: {
        name: 'list_id',
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id',
});

Card.belongsToMany(Tag, {
    as: 'tags',
    through: 'card_has_tag',
    foreignKey: 'card_id',
});

Tag.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_tag',
    foreignKey: 'tag_id',
});


export { List, Card, Tag, client };