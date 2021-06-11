import express from 'express';
import path from 'path';
import cors from 'cors';
import 'express-async-errors';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import { startDatabase } from './database/connection';
import routes from './index.routes';

dotenv.config({
  path: process.env.NODE_ENV
    ? path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`)
    : path.join(__dirname, '..', '.env'),
});

startDatabase();

const app = express();

app.use(
  cors({
    exposedHeaders: 'Access-Token',
  }),
);
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errors());

// criar middleware para enviar token

app.listen(process.env.API_PORT || process.env.PORT, () =>
  console.log(
    `⚡ Server online on port ${process.env.API_PORT || process.env.PORT}`,
  ),
);
