import { Tag } from "../models";

async function seedDatabase() {
    console.log('🔄 TeddyTask seeding started...');

    const urgentTag = await Tag.create({ name: 'Urgent', color: '#FFACAC' });
    const importantTag = await Tag.create({ name: 'Important', color: '#FFD7C4' }); 
    const notUrgentTag = await Tag.create({ name: 'Personal', color: '#DCFFBA' });

    await List.bulkCreate([
        { title: 'Liste des courses 1', position: 1, cards: [
            {  title: 'Chartreuse', description: 'contenu de la carte', date: '08/04/2025', position: 3 },
            {  title: 'Concombre', description: 'contenu de la carte', date: '08/04/2025', position: 2 },
            {  title: 'Savon', description: 'contenu de la carte', date: '08/04/2025', position: 1}
        ] },

        { title: 'Liste des courses 2', position: 1, cards: [
            {  title: 'Chartreuse', description: 'contenu de la carte', date: '08/04/2025', position: 4 },
            {  title: 'Concombre', description: 'contenu de la carte', date: '08/04/2025', position: 5 },
            {  title: 'Savon', description: 'contenu de la carte', date: '08/04/2025', position: 6 },
        ] },
    ], {include: 'Card' });

    await addTagToCard(urgentTag, 1);
    await addTagToCard(importantTag, 2);
    await addTagToCard(notUrgentTag, 3);
    await addTagToCard(urgentTag, 4);
    await addTagToCard(importantTag, 5);
    await addTagToCard(notUrgentTag, 6);

    console.log('✅ TeddyTask seeding completed!');

    console.log('🧹 Clean up by closing database connexion');
    await client.close();
}

async function addTagToCard(cardTitle, tagId) {
    const card = await Card.findOne({ where: { title: cardTitle } });
    await card.addTzg(tagId);
    console.log(`Tag ${tagId} added to card ${cardTitle}`);
}