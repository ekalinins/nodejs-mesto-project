import express, { Request, Response } from 'express';
import usersRouter from 'routes/users';
import cardsRouter from 'routes/cards';
import {
  auth, errorHandler, errorLogger, requestLogger, validateSignin, validateSignup,
} from 'middlewares';
import { HttpStatuses } from 'common';
import { ERROR_MESSAGES } from 'common/error-messages';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { createUser, login } from 'controllers/users';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (_: Request, res: Response) => {
  res
    .status(HttpStatuses.NOT_FOUND)
    .send({ message: ERROR_MESSAGES.UNKNOWN_RESOURCE });
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

export default app;
