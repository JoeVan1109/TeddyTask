import { Tag, Card, List, client } from '../models/index.js';

async function seedDatabase() {
    console.log('🔄 TeddyTask seeding started...');

    const urgentTag = await Tag.create({ name: 'Urgent', color: '#FFACAC' });
    const importantTag = await Tag.create({ name: 'Important', color: '#FFD7C4' });
    const notUrgentTag = await Tag.create({ name: 'Personal', color: '#DCFFBA' });

    await List.bulkCreate([
        {
        title: 'Liste des courses 1',
        position: 1,
        date: '2032-05-20',
        cards: [
            { title: 'Chartreuse', content: 'contenu', position: 3 },
            { title: 'Concombre', content: 'contenu', position: 2 },
            { title: 'Savon', content: 'contenu', position: 1 }
        ]
        },
        {
        title: 'Liste des courses 2',
        position: 2,
        date: '2032-05-20',
        cards: [
            { title: 'Chartreuse', content: 'contenu', position: 4 },
            { title: 'Concombre', content: 'contenu', position: 5 },
            { title: 'Savon', content: 'contenu', position: 6 }
        ]
        }
    ], { include: ['cards'] });

    await addTagToCard(urgentTag, 'Chartreuse');
    await addTagToCard(importantTag, 'Concombre');
    await addTagToCard(notUrgentTag, 'Savon');

    console.log('✅ TeddyTask seeding completed!');
    await client.close();
    }

    async function addTagToCard(tag, cardTitle) {
    const card = await Card.findOne({ where: { title: cardTitle } });
    if (!card) return console.error(`Card not found: ${cardTitle}`);
    await card.addTag(tag);
    console.log(`Tag ${tag.name} added to card ${card.title}`);
}

await seedDatabase();
