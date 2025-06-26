import express, { Request, Response } from 'express';
import usersRouter from 'routes/users';
import cardsRouter from 'routes/cards';
import { auth, errorHandler } from 'middlewares';
import { HttpStatuses } from 'common';
import { ERROR_MESSAGES } from 'common/error-messages';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (_: Request, res: Response) => {
  res
    .status(HttpStatuses.NOT_FOUND)
    .send({ message: ERROR_MESSAGES.UNKNOWN_RESOURCE });
});

app.use(errors());
app.use(errorHandler);

export default app;
