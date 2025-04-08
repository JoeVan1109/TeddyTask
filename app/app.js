// importer express cors helmet et les routers
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { router } from './routers/index.js';

export const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS}));

app.use(express.static('./public'));

app.use(express.json());
app.use('/api',router);

