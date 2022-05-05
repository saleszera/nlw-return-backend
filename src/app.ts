import cors from 'cors';
import express from 'express';
import 'dotenv/config';

import { routes } from './routes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
