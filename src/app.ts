import express, { Request, Response } from 'express';
import usersRouter from '@/routes/users';
import cardsRouter from '@/routes/cards';
import {
  auth,
  errorHandler,
  errorLogger,
  requestLogger,
  validateSignin,
  validateSignup,
} from '@/middlewares';
import { ERROR_MESSAGES } from '@/common/error-messages';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import { createUser, login, logout } from '@/controllers/users';
import { NotFoundError } from '@/utils/errors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.post('/signup', validateSignup, createUser);
app.post('/signin', validateSignin, login);

app.use(auth);
app.post('/logout', logout);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (_: Request, __: Response, next) => {
  next(new NotFoundError(ERROR_MESSAGES.UNKNOWN_RESOURCE));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

export default app;
