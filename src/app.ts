import express from 'express';
import usersRouter from 'routes/users';
import cardsRouter from 'routes/cards';
import { errorHandler } from 'middlewares';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorHandler);

export default app;
