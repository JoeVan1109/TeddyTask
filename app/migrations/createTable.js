import { client } from '../models/index.js';

console.log('🗑️ Suppression des tables existantes...');
await client.drop();

console.log('🚧 Création des tables...');
await client.sync();

console.log('✅ Migration OK ! Fermeture de la base...');
await client.close();
