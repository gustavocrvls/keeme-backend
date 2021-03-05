import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';
import routes from './routes';

import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(process.env.API_PORT || 3000, () =>
  console.log(
    `Server online on port ${process.env.API_PORT || process.env.PORT}`,
  ),
);
