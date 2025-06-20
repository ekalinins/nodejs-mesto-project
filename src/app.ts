import express from 'express';
import usersRouter from 'routes/users';
import cardsRouter from 'routes/cards';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

export default app;
