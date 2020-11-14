import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';
import routes from './routes';

// import errorHandler from './errors/handler';

const app = express();

app.use(cors());
app.use(express.json());
// app.use(routes);
// app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log(process.env.PORT || 3000));