// ecoute du port 3000
// ne pas oublier d'importer le app.js
// importer la config

import 'dotenv/config';
import { createServer } from 'node:http';
import { app } from './app/app.js';

const PORT = process.env.PORT ?? 3000;

const server = createServer(app);

server.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});